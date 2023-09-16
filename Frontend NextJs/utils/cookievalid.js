function isCookieValid(cookieName) {
    const cookieValue = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(`${cookieName}=`));
  
    if (cookieValue) {
      const [, value] = cookieValue.split('=');
      const cookieData = decodeURIComponent(value);
  
      // Parse the cookie data and check if it's valid based on your requirements
      // For example, check for specific attributes like an expiration date, domain, or path
  
      // Example: Check if the cookie contains an expiration date attribute
      const cookieAttributes = cookieData.split('; ');
      for (const attribute of cookieAttributes) {
        if (attribute.startsWith('expires=')) {
          const expirationDate = new Date(attribute.substring(8));
          const currentDate = new Date();
          return expirationDate > currentDate;
        }
      }
  
      // You can add more checks here based on your specific cookie attributes
  
      // If no specific checks are required, you can simply return true
      return true;
    }
  
    return false; // Cookie doesn't exist
  }
  
  const cookieName = 'myCookie';
  if (isCookieValid(cookieName)) {
    console.log(`${cookieName} is valid.`);
  } else {
    console.log(`${cookieName} is not valid or doesn't exist.`);
  }
  





  import { parse } from 'cookie';

// Inside your getServerSideProps function or API route
export async function getServerSideProps(context) {
  const cookies = parse(context.req.headers.cookie || ''); // Parse cookies from the request headers

  // Check if a specific cookie exists (e.g., a token representing login status)
  const isLoggedIn = !!cookies.myAuthToken; // Replace with the name of your authentication cookie

  // Your logic based on the login status
  if (isLoggedIn) {
    // User is logged in
  } else {
    // User is not logged in
  }

  // ...
}
