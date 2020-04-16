import { createMuiTheme } from '@material-ui/core';
import EnvVariables from '../utils/EnvironmentVariables';

const materialConfig = createMuiTheme({
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
