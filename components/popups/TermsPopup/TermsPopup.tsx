import React, { CSSProperties, useState } from 'react';
import styles from './styles.module.css'; // Import the CSS module
import Button from '@/components/buttons/Button/Button';
import { AiOutlineClose } from 'react-icons/ai';

const TermsPopup = ({
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
        label='Terms of use'
        handleClick={() => setOpen(true)}
        style={buttonStyle}
      />

      {open && (
        <div className={styles.termsOverlay}>
          <div className={styles.termsModal}>
            <div className={styles.termsHeader}>
              <h2>Terms of Use</h2>
              <AiOutlineClose 
                onClick={() => setOpen(false)}
                size={'1.2rem'}
                cursor={'pointer'}
              />
            </div>

            <div className={styles.termsContent}>
              <section>
                <h3>1. Introduction</h3>
                <p>
                  Welcome to [Your Platform Name], a marketplace that connects martial arts studio owners and potential students.
                  By accessing or using the platform, you agree to comply with and be bound by these Terms of Use.
                </p>
              </section>

              <section>
                <h3>2. Subscription and Cancellation</h3>
                <ul>
                  <li><strong>Monthly Subscription Fee:</strong> $29 per month.</li>
                  <li><strong>No Refund Policy:</strong> Payments are non-refundable.</li>
                  <li><strong>Cancellation:</strong> Takes effect at the end of the billing cycle.</li>
                </ul>
              </section>

              <section>
                <h3>3. Account Registration</h3>
                <ul>
                  <li><strong>Owner Accounts:</strong> Studio owners must create an account.</li>
                  <li><strong>Student Accounts:</strong> Students can register for classes.</li>
                </ul>
              </section>

              <section>
                <h3>4. Platform Limitations</h3>
                <ul>
                  <li><strong>Platform as a Tool:</strong> The platform serves as a directory and booking system.</li>
                  <li><strong>No Responsibility:</strong> We are not responsible for class quality.</li>
                </ul>
              </section>

              <section>
                <h3>5. Booking and Registration</h3>
                <ul>
                  <li><strong>Student Registration:</strong> Booking confirmation is pending owner approval.</li>
                  <li><strong>Owner Responsibility:</strong> Owners manage class schedules.</li>
                </ul>
              </section>

              <section>
                <h3>6. Disputes and Issues</h3>
                <p>We are not responsible for disputes between owners and students.</p>
              </section>

              <section>
                <h3>7. Termination and Cancellation</h3>
                <ul>
                  <li><strong>Owner Termination:</strong> Owners may cancel anytime.</li>
                  <li><strong>Platform Termination:</strong> We may terminate accounts for violations.</li>
                </ul>
              </section>

              <section>
                <h3>8. Limitation of Liability</h3>
                <ul>
                  <li><strong>Platform Limitations:</strong> We are not liable for damages.</li>
                  <li><strong>Data Privacy:</strong> Owners are responsible for compliance.</li>
                </ul>
              </section>

              <section>
                <h3>9. Changes to Terms</h3>
                <p>We may update these terms, with changes communicated via email or on the platform.</p>
              </section>
            </div>

            <div className={styles.termsFooter}>
              <Button 
                label='close'
                handleClick={() => setOpen(false)}
                style={{
                  marginLeft: 'auto'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsPopup;
