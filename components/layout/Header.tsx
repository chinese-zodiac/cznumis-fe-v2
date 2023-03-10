import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { texas } from '@/providers/BaseThemeProvider';

const Header = () => {
  return (
    <header>
      <AppBar
        position="static"
        elevation={0}
        color="transparent"
        sx={{
          borderBottom: `1px solid #F2E5D6`,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          pt: '20px',
          pb: 3,
        }}
      >
        <Toolbar>
          <Image src="/LSDT 1.png" width={78} height={78} alt="CZNumis Logo" />
          <Typography
            variant="h4"
            component="div"
            sx={(theme) => ({
              flexGrow: 1,
              pl: 2,
              fontFamily: texas.style.fontFamily,
              color: '#755A3B',
            })}
          >
            CZ Numismatics
          </Typography>
          <Button variant="outlined" color="primary" sx={{ borderRadius: 4 }}>
            Connect
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
