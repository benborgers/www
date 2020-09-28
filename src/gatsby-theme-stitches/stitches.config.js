import { createStyled } from '@stitches/react'

export const { styled, css } = createStyled({
    tokens: {
        fonts: {
            $sans: 'system-ui, sans-serif',
            $serif: 'Georgia, serif'
        }
    }
})
