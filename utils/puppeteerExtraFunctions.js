// Get the browser context
exports.getBrowserContext = async (browser) => {
  try {
    const context = await browser.defaultBrowserContext();
    return context;
  } catch (error) {
    console.log(error);
  }
};

// Give to a website the authorization to use some features
exports.grantWebsiteAuthorization = async (context, url, permissions) => {
  try {
    await context.overridePermissions(url, permissions);
  } catch (error) {
    console.log(error);
  }
};
