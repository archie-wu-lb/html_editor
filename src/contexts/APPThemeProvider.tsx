/** @format */

import { ThemeProvider } from '@mui/material/styles';
import * as themes from '@/themes';
import type { Theme } from '@mui/material/styles';
import ProjectConfig from '../project.config.json';

interface Props {
	children?: React.ReactNode;
}
const themeOptions = Object.assign({}, themes) as Record<string, Theme>;
const theme: Theme = themeOptions[ProjectConfig.themeName] || themeOptions.defaultTheme;

const APPThemeProvider = (props: Props) => {
	const { children } = props;
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default APPThemeProvider;
