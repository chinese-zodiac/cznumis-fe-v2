export default async function fetchRetry(url) {
    let i = 0;
    while (true) {
        try {
            const res = await fetch(url);
            return res;
        } catch (err) {
            console.log("Fetch Err: ", err)
        }
        // Wait 100ms*i between requests
        i++;
        await new Promise(r => setTimeout(r, 250 * i * (Math.random() + 0.5)));
    }
}