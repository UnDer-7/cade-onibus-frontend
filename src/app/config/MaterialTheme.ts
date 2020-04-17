import { createMuiTheme, Theme } from '@material-ui/core';
import EnvVariables from '../utils/EnvironmentVariables';

const materialConfig: Theme = createMuiTheme({
  palette: {
    primary: {
      main: EnvVariables.PRIMARY_COLOR,
    },
    secondary: {
      main: '#fbfff7',
    },
  },
});

export default materialConfig;
