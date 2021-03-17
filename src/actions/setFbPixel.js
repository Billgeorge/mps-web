export const setFbPixel =(id) => (
    {
        type: 'set-fb-pixel',
        payload:id
    }   
)

export const setValue =(value) => (
    {
        type: 'set-value',
        payload:value
    }   
)