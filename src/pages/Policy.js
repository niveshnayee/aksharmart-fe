import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title="Privacy Policy - AksharMart">
      <div className="policy-container">
        <h1>Privacy Policy</h1>

        <div className="policy-section">
          <h2>Information We Collect</h2>
          <div className="policy-content">
            <p>
              We collect information from you when you visit our site, register
              on our site, place an order, subscribe to our newsletter, or fill
              out a form. The types of information we may collect include:
            </p>
            <ul>
              <li>
                Personal Identification Information: Name, email address,
                mailing address, phone number.
              </li>
              <li>
                Payment Information: Credit card information, billing address.
              </li>
              <li>
                Technical Data: IP address, browser type, operating system, and
                other technical details.
              </li>
            </ul>
          </div>
        </div>

        <div className="policy-section">
          <h2>How We Use Your Information</h2>
          <div className="policy-content">
            <p>
              The information we collect from you may be used in the following
              ways:
            </p>
            <ul>
              <li>
                To process transactions and deliver products or services you
                have requested.
              </li>
              <li>To improve our website and personalize your experience.</li>
              <li>
                To send periodic emails regarding your order or other products
                and services.
              </li>
              <li>To administer contests, promotions, or surveys.</li>
            </ul>
          </div>
        </div>

        <div className="policy-section">
          <h2>How We Protect Your Information</h2>
          <div className="policy-content">
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information. These measures include:
            </p>
            <ul>
              <li>
                Using secure servers and SSL (Secure Socket Layer) technology to
                encrypt sensitive information.
              </li>
              <li>
                Regularly updating our software and systems to protect against
                potential vulnerabilities.
              </li>
            </ul>
          </div>
        </div>

        <div className="policy-section">
          <h2>Sharing Your Information</h2>
          <div className="policy-content">
            <p>
              We do not sell, trade, or otherwise transfer to outside parties
              your personally identifiable information, except in the following
              circumstances:
            </p>
            <ul>
              <li>When we have your consent to share the information.</li>
              <li>
                When we need to share information to provide a product or
                service you have requested.
              </li>
              <li>When we are required to share information by law.</li>
            </ul>
          </div>
        </div>

        <div className="policy-section">
          <h2>Your Consent</h2>
          <div className="policy-content">
            <p>By using our site, you consent to our website privacy policy.</p>
          </div>
        </div>

        <div className="policy-section">
          <h2>Changes to Our Privacy Policy</h2>
          <div className="policy-content">
            <p>
              We reserve the right to update or change our Privacy Policy at any
              time. Any changes will be posted on this page.
            </p>
          </div>
        </div>

        <div className="policy-section">
          <h2>Contact Us</h2>
          <div className="policy-content">
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p>Email: support@akshar_mart.com</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
