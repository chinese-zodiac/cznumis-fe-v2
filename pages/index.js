import { Open_Sans } from '@next/font/google'
import { useTheme } from '@mui/material';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <main className={openSans.className} >

      </main>
    </>
  )
}
