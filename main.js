const playwright = require('playwright')
const cookies = require('./cookies.json')

// Imports cookies and goes to nintendo. User automatically logged in because of cookies
async function automate (context) {
    const page = await context.newPage()
    cookies.forEach(c => { delete c.sameSite })             // remove sameSite, playwright has different values
    await context.addCookies(cookies)                       // import cookies into browser
    await page.goto('https://accounts.nintendo.com/')   // navigate to nintendo
    await page.waitForTimeout(5000)                 // wait for 5 seconds
}

//  Main method, starts the browser
async function main () {
    let browser
    try {
        browser = await playwright.chromium.launch({ headless: false })
        const context = await browser.newContext()
        await automate(context)
    } catch (err) {
        console.error(err)
    } finally {
        if (browser) await browser.close()
    }
}

main()
