
export function configure( baseConfig ) {
    const markdown = 
    {
        /* Solve escaping of inline code blocks specifically `{{` which is not supported by default in vite press
        * https://github.com/vuejs/vitepress/discussions/480
        *  +--> https://github.com/vuejs/vitepress/discussions/3724#discussioncomment-8963669 */
        config(md) {
            const defaultCodeInline = md.renderer.rules.code_inline
            md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
                tokens[idx].attrSet('v-pre', '')
                return defaultCodeInline(tokens, idx, options, env, self)
            }
        }
    }    
    
    const proxy = {
        "/recordm" : {
            target: 'https://learning.cultofbits.com/',
            changeOrigin: true,
            configure: (proxy, options) => {
                proxy.on('proxyRes', (proxyRes, r, _) => {
                    proxyRes.headers['content-security-policy'] =  "nonce"
                } )
            }
        },"/userm" : {
            target: 'https://learning.cultofbits.com/',
            changeOrigin: true,
            configure: (proxy, options) => {
                proxy.on('proxyRes', (proxyRes, r, _) => {
                    proxyRes.headers['content-security-policy'] =  "nonce"
                } )
            }
        }
    }

    baseConfig.title = "Cult of Bits Learning"

    return {
        ...baseConfig,
        markdown, 
        vite: {
            server: { 
                proxy, 
            } 
        }
    }
}