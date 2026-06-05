import Foundation
import Alamofire

@objc(MultipartFormDataWrapper)
@objcMembers
public class MultipartFormDataWrapper: NSObject {
    
    private var parts: [(MultipartFormData) -> Void] = []
    
    @objc public func appendPartWithFileURLNameFileNameMimeTypeError(
        _ fileURL: URL,
        _ name: String,
        _ fileName: String,
        _ mimeType: String
    ) {
        parts.append { multipartFormData in
            multipartFormData.append(fileURL, withName: name, fileName: fileName, mimeType: mimeType)
        }
    }
    
    @objc public func appendPartWithFileDataNameFileNameMimeType(
        _ data: Data,
        _ name: String,
        _ fileName: String,
        _ mimeType: String
    ) {
        parts.append { multipartFormData in
            multipartFormData.append(data, withName: name, fileName: fileName, mimeType: mimeType)
        }
    }
    
    @objc public func appendPartWithFormDataName(
        _ data: Data,
        _ name: String
    ) {
        parts.append { multipartFormData in
            multipartFormData.append(data, withName: name)
        }
    }
    
    // Internal method to apply all parts to an Alamofire MultipartFormData object
    internal func apply(to multipartFormData: MultipartFormData) {
        for part in parts {
            part(multipartFormData)
        }
    }
}
