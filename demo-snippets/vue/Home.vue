<template>
    <Page>
        <ActionBar title="HTTPS Plugin Tests" backgroundColor="#42b883" color="white"/>
        <ScrollView>
            <StackLayout class="p-20">
                <Label class="h1 text-center mb-20" text="HTTPS Plugin Test Suite" />
                <Label class="text-center mb-20" text="Select a test category:" textWrap="true" />
                
                <Button text="📡 Basic HTTP Methods" @tap="navigate('BasicRequests')" class="btn btn-primary mb-10" />
                <Button text="⚡ Early Resolution (iOS)" @tap="navigate('EarlyResolution')" class="btn btn-primary mb-10" />
                <Button text="💾 Conditional Streaming (iOS)" @tap="navigate('ConditionalStreaming')" class="btn btn-primary mb-10" />
                <Button text="📁 File Operations" @tap="navigate('FileOperations')" class="btn btn-primary mb-10" />
                <Button text="🔐 SSL Pinning" @tap="navigate('SSLPinning')" class="btn btn-primary mb-10" />
                <Button text="💿 Caching & Cookies" @tap="navigate('CachingAndCookies')" class="btn btn-primary mb-10" />
                <Button text="📊 Progress & Cancellation" @tap="navigate('ProgressAndCancellation')" class="btn btn-primary mb-10" />
                <Button text="❌ Error Handling" @tap="navigate('ErrorHandling')" class="btn btn-primary mb-10" />
                <Button text="🔧 Advanced Features" @tap="navigate('Advanced')" class="btn btn-primary mb-10" />
                <Button text="🧪 Original Basic Tests" @tap="navigate('Basic')" class="btn btn-outline mb-10" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script lang="ts">
import Vue from 'vue';
import { Frame } from '@nativescript/core';

export default Vue.extend({
    methods: {
        navigate(component: string) {
            const frame = Frame.topmost();
            frame.navigate({
                moduleName: `demo-snippets/vue/${component}`,
                transition: {
                    name: 'slide'
                }
            });
        }
    }
});
</script>

<style scoped lang="scss">
.btn {
    background-color: #42b883;
    color: white;
    font-size: 16;
    padding: 15;
    margin: 5 0;
    border-radius: 5;
}
.btn-outline {
    background-color: transparent;
    color: #42b883;
    border-color: #42b883;
    border-width: 2;
}
.h1 {
    font-size: 24;
    font-weight: bold;
    color: #42b883;
}
</style>
