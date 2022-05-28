import Container from '@mui/material/Container';

function PrivacyPolicy() {
  return (
    <Container component="main" maxWidth="md">
      <h1>Climbing Partners Privacy Policy</h1>
      <p>Last updated: May 28, 2022</p>
      <p>
        This Privacy Policy describes Our policies and procedures on the collection, use and
        disclosure of Your information when You use the Service and tells You about Your privacy
        rights and how the law protects You.
      </p>
      <p>
        We use Your Personal data to provide and improve the Service. By using the Service, You
        agree to the collection and use of information in accordance with this Privacy Policy.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>
          Climbing Partner accounts are created using Google Firebase Authentication Services and
          you are identified to the app via a unique firebase user id and an email address.
        </li>
        <li>
          Email addresses are only used for logging in and responding to emails that you initiate,
          and sending notifications that you request. We dont send promotional emails.
        </li>
        <li>
          We only store strictly necessary information to be able to provide the websites purpose
          and functionality. We store data about your profile, your partner search ads and your chat
          logs.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use Firebase from Google that handles Cookies to keep you logged in and authorize you to
        your data in our services.
      </p>
      <p>
        For more information about Firebase and Privacy read here:{' '}
        <a target="_blanc" href="https://firebase.google.com/support/privacy">
          Privacy and Security in Firebase{' '}
        </a>
      </p>
      <ul>
        <li>
          <strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your
          Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie
          is being sent. However, if You do not accept Cookies, You may not be able to use some
          parts of our Service. Unless you have adjusted Your browser setting so that it will refuse
          Cookies, our Service may use Cookies.
        </li>
      </ul>
      <p>
        Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies
        remain on Your personal computer or mobile device when You go offline, while Session Cookies
        are deleted as soon as You close Your web browser. You can learn more about cookies here:{' '}
        <a href="https://gdpr.eu/cookies/" target="_blank" rel="noreferrer">
          Cookies
        </a>
        .
      </p>
      <p>We use Persistent Cookies for the purposes set out below:</p>
      <ul>
        <li>
          <p>
            <strong>Necessary / Essential Cookies</strong>
          </p>
          <p>Type: Persistant Cookies</p>
          <p>Administered by: Firebase, Google</p>
          <p>
            Purpose: Firebase Authentication uses the data to enable end-user authentication, and
            facilitate end-user account management. It also uses user-agent strings and IP addresses
            to provide added security and prevent abuse during sign-up and authentication.
          </p>
          <p>
            Retention: Firebase Authentication keeps logged IP addresses for a few weeks. It retains
            other authentication information until the Firebase customer initiates deletion of the
            associated user, after which data is removed from live and backup systems within 180
            days.
          </p>
        </li>
      </ul>
      <h2>Information usage</h2>
      <ul>
        <li>We use the information we collect to operate and improve our website.</li>
        <li>
          We do not share personal information with outside parties except to the extent necessary
          to accomplish Climbing Partners functionality.
        </li>
        <li>
          In the future, we may sell to, buy, merge with, or partner with other businesses. In such
          transactions, user information may be among the transferred assets.
        </li>
      </ul>

      <h2>Security</h2>
      <ul>
        <li>
          We implement a variety of security measures to help keep your information secure. We do
          not store your login passwords in the app (or even have access to them) as authentication
          services are provided by Firebase Auth Services from Google.
        </li>
        <li>
          Firebase Authentication uses the data to enable end-user authentication, and facilitate
          end-user account management. It also uses user-agent strings and IP addresses to provide
          added security and prevent abuse during sign-up and authentication.
        </li>
        <li>
          Retention: Firebase Authentication keeps logged IP addresses for a few weeks. It retains
          other authentication information until the Firebase customer initiates deletion of the
          associated user, after which data is removed from live and backup systems within 180 days.
        </li>
        <li>
          The security of Your Personal Data is important to Us, but remember that no method of
          transmission over the Internet, or method of electronic storage is 100% secure. While We
          strive to use commercially acceptable means to protect Your Personal Data, We cannot
          guarantee its absolute security. In case of a databreach we will inform you within 72
          hours.
        </li>
      </ul>

      <h2>Accessing, changing, or deleting information</h2>
      <ul>
        <li>
          Climbing Partners may delete your information at any time and for any reason, such as
          technical needs, legal concerns, abuse prevention, removal of idle accounts, data loss, or
          any other reason.
        </li>
        <li>
          You have the rights to choose to remove all your personal data from the application. To do
          so please contact us at: es225kz@student.lnu.se
        </li>
      </ul>

      <h2>Children's Online Privacy Protection Act Compliance</h2>
      <ul>
        <li>
          We never collect or maintain information at our website from those we actually know are
          under 13, and no part of our website is structured to attract anyone under 13.
        </li>
      </ul>
      <h2>Information for European Union Customers</h2>
      <ul>
        <li>
          By using Climbing Partners and providing your information, you authorize us to collect,
          use, and store your information outside of the European Union. International Transfers of
          Information
        </li>
        <li>
          Information may be processed, stored, and used outside of the country in which you are
          located. Data privacy laws vary across jurisdictions, and different laws may be applicable
          to your data depending on where it is processed, stored, or used.
        </li>
      </ul>
      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, You can contact us:</p>
      <ul>
        <li>By email: es225kz@student.lnu.se</li>
      </ul>
    </Container>
  );
}

export default PrivacyPolicy;
