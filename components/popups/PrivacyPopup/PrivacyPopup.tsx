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
                <p>At [Your Platform Name], we value your privacy and are committed to protecting your personal information.</p>
              </section>

              <section>
                <h3>2. Data We Collect</h3>
                <ul>
                  <li><strong>Owner Data:</strong> Business name, contact details, and payment information.</li>
                  <li><strong>Student Data:</strong> Contact information and booking details.</li>
                </ul>
              </section>

              <section>
                <h3>3. How We Use Your Data</h3>
                <ul>
                  <li>To manage your account and subscription</li>
                  <li>To process payments</li>
                  <li>To facilitate class registrations</li>
                  <li>To communicate platform updates</li>
                </ul>
              </section>

              <section>
                <h3>4. Data Security</h3>
                <p>We use encryption and secure servers to protect your data, but no method is 100% secure.</p>
              </section>

              <section>
                <h3>5. Data Retention</h3>
                <p>We retain data as necessary or as required by law. You can request deletion at [your contact email].</p>
              </section>

              <section>
                <h3>6. Data Sharing</h3>
                <p>We don’t sell data but may share it with trusted providers who comply with security standards.</p>
              </section>

              <section>
                <h3>7. Owner Responsibilities</h3>
                <ul>
                  <li>Comply with data privacy laws (e.g., HIPAA)</li>
                  <li>Protect student data security</li>
                  <li>Provide privacy policies for collected data</li>
                </ul>
              </section>

              <section>
                <h3>8. Changes to Policy</h3>
                <p>Policy updates will be posted here and communicated via email or notifications.</p>
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
