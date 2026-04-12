import Foundation
import Alamofire

@objc(SecurityPolicyWrapper)
@objcMembers
public class SecurityPolicyWrapper: NSObject {
    
    private var pinnedCertificatesData: [Data] = []
    @objc public var allowInvalidCertificates: Bool = false
    @objc public var validatesDomainName: Bool = true
    @objc public var pinningMode: Int = 0 // 0 = None, 1 = PublicKey, 2 = Certificate
    
    @objc public static func defaultPolicy() -> SecurityPolicyWrapper {
        let policy = SecurityPolicyWrapper()
        policy.allowInvalidCertificates = true
        policy.validatesDomainName = false
        policy.pinningMode = 0
        return policy
    }
    
    @objc public static func policyWithPinningMode(_ mode: Int) -> SecurityPolicyWrapper {
        let policy = SecurityPolicyWrapper()
        policy.pinningMode = mode
        return policy
    }
    
    @objc public var pinnedCertificates: NSSet? {
        get {
            return NSSet(array: pinnedCertificatesData)
        }
        set {
            if let set = newValue {
                pinnedCertificatesData = set.allObjects.compactMap { $0 as? Data }
            } else {
                pinnedCertificatesData = []
            }
        }
    }
}

// Extension to make SecurityPolicyWrapper work with Alamofire's ServerTrustEvaluating
extension SecurityPolicyWrapper: ServerTrustEvaluating {
    
    public func evaluate(_ trust: SecTrust, forHost host: String) throws {
        // If we allow invalid certificates and don't validate domain name, accept all
        if allowInvalidCertificates && !validatesDomainName {
            return
        }
        
        // Get the server certificates
        let serverCertificates: [SecCertificate]
        if #available(iOS 15.0, *) {
            if let certificateChain = SecTrustCopyCertificateChain(trust) as? [SecCertificate] {
                serverCertificates = certificateChain
            } else {
                serverCertificates = []
            }
        } else {
            serverCertificates = (0..<SecTrustGetCertificateCount(trust)).compactMap { index -> SecCertificate? in
                return SecTrustGetCertificateAtIndex(trust, index)
            }
        }
        
        // If no pinning mode, just validate the certificate chain
        if pinningMode == 0 {
            // Default validation
            if validatesDomainName {
                let policies = [SecPolicyCreateSSL(true, host as CFString)]
                SecTrustSetPolicies(trust, policies as CFTypeRef)
            }
            
            var error: CFError?
            let isValid = SecTrustEvaluateWithError(trust, &error)
            
            if !isValid && !allowInvalidCertificates {
                throw AFError.serverTrustEvaluationFailed(reason: .trustEvaluationFailed(error: error))
            }
            return
        }
        
        // Pinning validation
        if pinnedCertificatesData.isEmpty {
            // No pinned certificates to validate against
            if !allowInvalidCertificates {
                throw AFError.serverTrustEvaluationFailed(reason: .noCertificatesFound)
            }
            return
        }
        
        // Public Key Pinning
        if pinningMode == 1 {
            let serverPublicKeys = serverCertificates.compactMap { certificate -> SecKey? in
                return SecCertificateCopyKey(certificate)
            }
            
            let pinnedPublicKeys = pinnedCertificatesData.compactMap { data -> SecKey? in
                guard let certificate = SecCertificateCreateWithData(nil, data as CFData) else {
                    return nil
                }
                return SecCertificateCopyKey(certificate)
            }
            
            // Check if any server public key matches any pinned public key
            for serverKey in serverPublicKeys {
                for pinnedKey in pinnedPublicKeys {
                    if self.publicKeysMatch(serverKey, pinnedKey) {
                        // Found a match, validation successful
                        return
                    }
                }
            }
            
            // No matching public keys found
            if !allowInvalidCertificates {
                throw AFError.serverTrustEvaluationFailed(reason: .certificatePinningFailed(host: host, trust: trust, pinnedCertificates: [], serverCertificates: []))
            }
        }
        // Certificate Pinning
        else if pinningMode == 2 {
            let serverCertificatesData = serverCertificates.compactMap { certificate -> Data? in
                return SecCertificateCopyData(certificate) as Data
            }
            
            // Check if any server certificate matches any pinned certificate
            for serverCertData in serverCertificatesData {
                if pinnedCertificatesData.contains(serverCertData) {
                    // Found a match, validation successful
                    return
                }
            }
            
            // No matching certificates found
            if !allowInvalidCertificates {
                throw AFError.serverTrustEvaluationFailed(reason: .certificatePinningFailed(host: host, trust: trust, pinnedCertificates: [], serverCertificates: []))
            }
        }
        
        // Domain name validation if required
        if validatesDomainName {
            let policies = [SecPolicyCreateSSL(true, host as CFString)]
            SecTrustSetPolicies(trust, policies as CFTypeRef)
            
            var error: CFError?
            let isValid = SecTrustEvaluateWithError(trust, &error)
            
            if !isValid && !allowInvalidCertificates {
                throw AFError.serverTrustEvaluationFailed(reason: .trustEvaluationFailed(error: error))
            }
        }
    }
    
    private func publicKeysMatch(_ key1: SecKey, _ key2: SecKey) -> Bool {
        // Get external representations of the keys
        var error1: Unmanaged<CFError>?
        var error2: Unmanaged<CFError>?
        
        guard let data1 = SecKeyCopyExternalRepresentation(key1, &error1) as Data?,
              let data2 = SecKeyCopyExternalRepresentation(key2, &error2) as Data? else {
            return false
        }
        
        return data1 == data2
    }
}
