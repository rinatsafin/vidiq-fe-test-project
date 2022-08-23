import { extendTheme, type ThemeConfig, type ComponentDefaultProps } from '@chakra-ui/react'
import Heading from './components/App/Heading'
import Select from './components/ColumnSelector/Select'
import Box from './components/ResponsiveTable/Box'

// color mode config
const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}
// breakpoints
const breakpoints = {
    sm: '24.375em',
    md: '67.3125em'
}

// components
const components: ComponentDefaultProps = {
    Heading,
    Select,
    Box
}


const theme = extendTheme({ config, components, breakpoints })

export default theme