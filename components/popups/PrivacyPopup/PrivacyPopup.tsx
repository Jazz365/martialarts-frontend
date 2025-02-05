import React, { CSSProperties, useState } from 'react';
import styles from './styles.module.css'; // Import the CSS module
import Button from '@/components/buttons/Button/Button';
import { AiOutlineClose } from 'react-icons/ai';

const PrivacyPopup = ({
    buttonStyle={
        backgroundColor: 'transparent',
        color: 'inherit',
        fontSize: '0.7rem',
        padding: 0,
    },
}: {
    buttonStyle?: CSSProperties;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label='Privacy Policy'
        handleClick={() => setOpen(true)}
        style={buttonStyle}
      />

      {open && (
        <div className={styles.privacyOverlay}>
          <div className={styles.privacyModal}>
            <div className={styles.privacyHeader}>
              <h2>Privacy Policy</h2>
              <AiOutlineClose 
                onClick={() => setOpen(false)}
                size={'1.2rem'}
                cursor={'pointer'}
              />
            </div>

            <div className={styles.privacyContent}>
              <section>
                <h3>1. Introduction</h3>
                <p>At martialarts.guru, we value your privacy and are committed to protecting your personal
                information. This Privacy Policy explains how we collect, use, and protect your data when
                you use our platform.</p>
              </section>

              <section>
                <h3>2. Data We Collect</h3>
                <ul>
                  <li><strong>Owner Data:</strong> When you create an owner account, we collect your business name,
                    contact details (email, phone number), payment details for subscriptions, and other
                    information necessary to manage your listings.</li>
                  <li><strong>Student Data:</strong> When you register as a student, we collect your contact information
                    (name, email address) and booking details.</li>
                </ul>
              </section>

              <section>
                <h3>3. How We Use Your Data</h3>
                <p>We use your data for the following purposes:</p>
                <ul>
                  <li>To manage your account and subscription,</li>
                  <li>To process payments,</li>
                  <li>To facilitate class registrations,</li>
                  <li>To communicate with you about platform updates and your account activity.</li>
                </ul>
              </section>

              <section>
                <h3>4. Data Collection by Owners</h3>
                <p>While we collect basic personal information for account and subscription management, the
                owners of martial arts studios listed on our platform are responsible for collecting
                and managing additional personal data, such as health declarations, from students.
                Owners are responsible for complying with all applicable laws and regulations regarding the
                collection and storage of sensitive data.</p>
              </section>

              <section>
                <h3>5. Data Security</h3>
                <p>We take reasonable measures to secure the personal data we collect, including using
                encryption and secure servers. However, no data transmission over the internet or method of
                electronic storage can be guaranteed 100% secure. We cannot guarantee absolute security
                of your data.</p>
              </section>

              <section>
                <h3>6. Data Retention</h3>
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined
                in this Privacy Policy or as required by law. If you wish to delete your account or request that
                your data be removed, please contact us at team@martialarts.guru.</p>
              </section>

              <section>
                <h3>7. Sharing of Data</h3>
                <p>We do not sell, rent, or lease your personal information to third parties. However, we may
                share your information with trusted third parties that help us operate the platform (e.g.,
                payment processors like PayPal). These third parties are required to protect your data and
                use it only for the services they provide.</p>
              </section>

              <section>
                <h3>8. Data Deletion and Management</h3>
                <p>You can request to delete your account and personal information at any time by contacting
                us at team@martialarts.guru. Please note that certain data may be retained for accounting
                and legal purposes.</p>
              </section>

              <section>
                <h3>9. Owner Responsibilities</h3>
                <p>If you are an owner using the platform to collect personal data (e.g., health declarations),
                you are responsible for:</p>
                <ul>
                  <li>Ensuring compliance with all applicable data privacy laws, such as HIPAA (for
                    health-related data), or any other relevant regulations.</li>
                  <li>Protecting the privacy and security of the personal data you collect from students.</li>
                  <li>Providing your own privacy policy to students regarding their data.</li>
                </ul>
              </section>

              <section>
                <h3>10. Changes to This Privacy Policy</h3>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this
                page, and we will notify you of significant updates via email or through the platform. Your
                continued use of the platform after any changes constitutes your acceptance of the updated
                Privacy Policy.</p>
              </section>
            </div>

            <div className={styles.privacyFooter}>
              <Button 
                label='Close'
                handleClick={() => setOpen(false)}
                style={{ marginLeft: 'auto' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyPopup;