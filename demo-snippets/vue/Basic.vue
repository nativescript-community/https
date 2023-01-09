<template>
    <Page>
        <ActionBar title="HTTPS Demo"/>
        <GridLayout class="p-20" rows="auto,auto,auto,*">
            <Label class="h2 text-center" :color="enabled ? 'green' : 'red'" :text="enabled ? 'Httpbin SSL Pinning Enabled' : 'SSL Pinning Disabled'" />
            <GridLayout row="1" rows="auto" columns="*,auto">
                <Label fontSize="13" text="Here's a spinner to show the main thread is not blocked by network IO" textWrap="true" class="m-20" />
                <ActivityIndicator col="1" busy="true" />
            </GridLayout>
            <GridLayout row="2" rows="auto" columns="*,auto" :visibility="currentRequest ? 'visible' : 'collapsed'">
                <Progress minValue="0" maxValue="100" :value="progress" />
                <Button col="1" text="cancel" @tap="cancelCurrentRequest" />
            </GridLayout>
            <ScrollView row="3">
                <StackLayout>
                    <Button text="GET Bigfile" @tap="getBigFile" class="t-20 btn btn-primary btn-active" />
                    <Button text="GET 404" @tap="get404" class="t-20 btn btn-primary btn-active" />
                    <Button text="GET Mockbin" @tap="getMockbin" class="t-20 btn btn-primary btn-active" />
                    <Button text="GET Httpbin" @tap="getHttpbin" class="t-20 btn btn-primary btn-active" />
                    <Button text="GET Httpbin (large response)" @tap="getHttpbinLargeResponse" class="t-20 btn btn-primary btn-active" />
                    <Button text="POST Httpbin " @tap="postHttpbin" class="t-20 btn btn-primary btn-active" />
                    <Button text="POST Httpbin UTF-8" ta@tapp="postHttpbinWithUTF8" class="t-20 btn btn-primary btn-active" />
                    <Button text="Httpbin Pinning ON" @tap="enableSSLPinning" class="t-20 btn btn-primary btn-active" />
                    <Button text="Httpbin Pinning ON, expired cert" @tap="enableSSLPinningExpired" class="t-20 btn btn-primary btn-active" />
                    <Button text="Httpbin Pinning OFF" @tap="disableSSLPinning" class="t-20 btn btn-primary btn-active" />
                </StackLayout>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import Vue from 'vue';
import { AndroidApplication, Application, Device, EventData, Utils } from '@nativescript/core';
import * as Https from '@nativescript-community/https';
import * as fs from '@nativescript/core/file-system';

export default Vue.extend({
    data() {
        return {
            currentRequest: null,
            enabled: false,
            progress: 0
        };
    },
    mounted() {
        // worker.onmessage = msg => {
        //     const dict = valueFromPointerNumber(NSDictionary, msg.data.value.dictionaryPtr) as NSDictionary<string, any>;
        //     const type = dict.objectForKey('type') as string;
        //     console.log('postMessageToWorker', type);
        //     switch (type) {
        //         case 'image':
        //             this.showImage(dict.objectForKey('data'));
        //             break;
        //         default:
        //             break;
        //     }
        //     (dict as any).release();
        // };
    },
    methods: {
        createRequest(url: string, options?: Partial<Https.HttpsRequestOptions>) {
            return Https.createRequest({
                url,
                method: 'GET',
                timeout: 1,
                ...options
            });
        },

        onError(error) {
            console.error('Https.request error', error, error.stack);
            alert(error.toString());
            this.currentRequest = null;
            this.progress = 0;
            return Promise.reject(error);
        },
        getRequest(url: string, options?: Partial<Https.HttpsRequestOptions>) {
            return Https.request({
                url,
                method: 'GET',
                timeout: 1,
                ...options
            })
                .then((response) => {
                    this.currentRequest = null;
                    this.progress = 0;
                    console.log('Https.request response', response.statusCode, response.content.toString());
                    return response;
                })
                .catch(this.onError);
        },

        postRequest(url: string, options?: Partial<Https.HttpsRequestOptions>) {
            return Https.request({
                url,
                method: 'POST',
                ...options
            })
                .then((response) => console.log('Https.request response', response))
                .catch((error) => {
                    console.error('Https.request error', error);
                    alert(error);
                });
        },

        postHttpbin() {
            this.postRequest('https://httpbin.org/post', {
                body: { foo: 'bar', baz: undefined, plaz: null }
            });
        },

        postHttpbinWithUTF8() {
            Https.request({
                url: 'https://httpbin.org/post',
                method: 'POST',
                body: { foo: 'bar', baz: undefined, plaz: null },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'X-testing': 'ok'
                }
            }).catch((error) => {
                console.error('Https.request error', error);
                alert(error);
            });
        },

        getHttpbin() {
            this.getRequest('https://httpbin.org/get', {
                headers: {
                    // 'Cache-Control': 'public, only-if-cached, max-stale=' +(60 * 60 * 24 * 7),
                    'Cache-Control': 'max-age=50000'
                }
            });
        },

        cancelCurrentRequest() {
            if (this.currentRequest) {
                this.currentRequest.cancel();
            }
        },
        getBigFile() {
            const request = this.createRequest('http://ipv4.download.thinkbroadband.com/200MB.zip', {
                onProgress: (current, total) => {
                    this.progress = (current / total) * 100;
                }
            });
            this.currentRequest = request;

            return new Promise<any>((resolve, reject) => {
                request.run(resolve, reject);
            })
                .then((response) => {
                    console.log('did get response');
                    const dir = fs.knownFolders.temp().getFile('200MB.zip');
                    return (response.content as Https.HttpsResponseLegacy).toFile(dir.path);
                    // console.log("did get response done");
                })
                .then(() => {
                    this.currentPromise = null;
                    console.log('did get response done');
                })
                .catch(this.onError);
        },

        getHttpbinLargeResponse() {
            this.getRequest('https://httpbin.org/bytes/100000');
        },

        getMockbin() {
            this.getRequest('https://mockbin.com/request');
        },

        get404() {
            this.getRequest('https://mockbin.com/reque2st');
        },

        enableSSLPinning(args: EventData) {
            const dir = fs.knownFolders.currentApp().getFolder('assets');
            const certificate = dir.getFile('httpbin.org.cer').path;
            Https.enableSSLPinning({
                host: 'httpbin.org',
                commonName: 'httpbin.org',
                certificate
            });
            this.enabled = true;
            console.log('enabled');
        },

        enableSSLPinningExpired(args: EventData) {
            const dir = fs.knownFolders.currentApp().getFolder('assets');
            const certificate = dir.getFile('httpbin.org.expired.cer').path;
            Https.enableSSLPinning({ host: 'httpbin.org', certificate });
            this.enabled = true;
            console.log('enabled');
        },

        disableSSLPinning(args: EventData) {
            Https.disableSSLPinning();
            this.enabled = false;
            console.log('disabled');
        }
    }
});
</script>

<style scoped lang="scss">
ActionBar {
    background-color: #42b883;
    color: white;
}
Button {
    background-color: #42b883;
    color: white;
}
</style>
