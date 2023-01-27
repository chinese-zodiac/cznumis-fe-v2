import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// Components
import Header from '@/components/layout/Header';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <>
      <Box sx={{ mx: 'auto', width: '100%', maxWidth: '1200px' }}>
        <Header />
        <Typography variant="h1" align="center" sx={{ pt: '72px' }}>
          Collect rare US coinage with 1:1 backed NFTs.
        </Typography>
        <Typography variant="body1" align="center" py={3}>
          Kept in trust with <u>Rafalovich Coins</u> and redeemable.
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          pb={3}
        >
          <progress value={600} max={1200} />
          <Typography variant="body1" align="center">
            Loading: <strong>50%</strong> (600/1200)
          </Typography>
        </Stack>
        <Typography align="center" color="GrayText">
          This site is faster on IPFS. Ask on Telegram for assistance.
        </Typography>
      </Box>
    </>
  );
}
