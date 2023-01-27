import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// Components
import Header from '@/components/layout/Header';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <>
      <Box
        sx={{ mx: 'auto', width: '100%', maxWidth: '1200px', display: 'block' }}
      >
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
          <Typography variant="body1" align="center" color="primary">
            Loading: <strong>50%</strong> (600/1200)
          </Typography>
        </Stack>
        <Typography align="center" color="GrayText" pb={2} fontWeight={300}>
          This site is faster on IPFS. Ask on Telegram for assistance.
        </Typography>
        <Box
          sx={(theme) => ({
            py: 1,
            px: 2,
            border: '1px solid #F2F3FA',
            borderRadius: 1,
            width: 'fit-content',
            color: '#9A9A9A',
            fontFamily: theme.typography.fontFamily,
          })}
        >
          <Box
            px={1}
            py="4px"
            display="inline-block"
            sx={{
              backgroundColor: '#F2F3FA',
              borderRadius: 1,
              mr: '12px',
              color: 'black',
              fontWeight: 600,
            }}
          >
            Taxes
          </Box>
          <span style={{ color: 'black' }}>0%</span> on buy,{' '}
          <span style={{ color: 'black' }}>12.5%</span> on sell.
        </Box>
        <div>Searchbar SortSelection FilterOpen</div>
        <div>Filter options</div>
        <div>Coin Grid</div>
      </Box>
    </>
  );
}
