import React, { CSSProperties, useState } from 'react';
import styles from './styles.module.css';
import Button from '@/components/buttons/Button/Button';
import { AiOutlineClose } from 'react-icons/ai';

const TermsPopup = ({
  buttonStyle = {
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
        label='Terms of Use'
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
                  Welcome to martialarts.guru, a marketplace that connects martial arts studio owners and
                  potential students. By accessing or using the platform, you agree to comply with and be
                  bound by these Terms of Use. If you do not agree with these terms, you may not use the
                  platform.
                </p>
              </section>

              <section>
                <h3>2. Subscription and Cancellation</h3>
                <ul>
                  <li><strong>Monthly Subscription Fee:</strong> Studio owners are required to pay a subscription fee of
                    $29 per month to list and manage their classes on the platform.</li>
                  <li><strong>No Refund Policy:</strong> All subscription payments are non-refundable. Once a payment
                    is made, it is not eligible for refund, either partially or in full, for any reason.</li>
                  <li><strong>Cancellation:</strong> Owners can cancel their subscription at any time. Cancelling the
                    subscription will take effect at the end of the current billing cycle, and they will not be
                    charged for the next month. No further charges will be incurred after cancellation.</li>
                </ul>
              </section>

              <section>
                <h3>3. Account Registration</h3>
                <ul>
                  <li><strong>Owner Accounts:</strong> Martial arts studio owners must create an account to list their
                    classes and manage their studio profile. You are responsible for maintaining the
                    confidentiality of your account information.</li>
                  <li><strong>Student Accounts:</strong> Students may create an account to register for classes listed by
                    owners. Students are responsible for the accuracy of the information they provide
                    during registration.</li>
                </ul>
              </section>

              <section>
                <h3>4. Platform Limitations</h3>
                <ul>
                  <li><strong>Platform as a Tool:</strong> martialarts.guru serves solely as a directory and booking
                    platform. We do not facilitate communication between owners and students directly;
                    such communication occurs outside the platform (e.g., via email or phone).</li>
                  <li><strong>No Responsibility for Services:</strong> We are not responsible for the quality or accuracy
                    of class listings, student bookings, or any interactions between users. The platform
                    does not mediate disputes or resolve issues between owners and students.</li>
                </ul>
              </section>

              <section>
                <h3>5. Booking and Registration Process</h3>
                <ul>
                  <li><strong>Student Registration:</strong> After students register for a class, they will receive a booking
                    confirmation. However, the class owner must confirm the student's registration.</li>
                  <li><strong>Owner Responsibility:</strong> Owners are responsible for verifying bookings and managing
                    class schedules. Owners may contact students directly for any necessary
                    communication regarding their registration.</li>
                </ul>
              </section>

              <section>
                <h3>6. Disputes and Issues</h3>
                <ul>
                  <li><strong>Dispute Resolution:</strong> Any disputes regarding class quality, cancellations, or bookings
                    between owners and students are not the responsibility of martialarts.guru. We are
                    only responsible for addressing technical issues related to the platform itself.</li>
                </ul>
              </section>

              <section>
                <h3>7. Termination and Cancellation</h3>
                <ul>
                  <li><strong>Owner Termination:</strong> Studio owners may cancel their subscription at any time. Upon
                    cancellation, access to the platform will be terminated at the end of the current billing
                    cycle.</li>
                  <li><strong>Platform Termination:</strong> martialarts.guru reserves the right to terminate any account
                    that violates these Terms of Use or engages in unlawful or fraudulent activities.</li>
                </ul>
              </section>

              <section>
                <h3>8. Limitation of Liability</h3>
                <ul>
                  <li><strong>Platform Limitations:</strong> martialarts.guru is not liable for any damages, loss of
                    revenue, or other negative outcomes resulting from using the platform, including any
                    disputes between owners and students.</li>
                  <li><strong>Data Privacy:</strong> martialarts.guru is not responsible for the handling, storage, or
                    security of sensitive personal data that owners collect from students (e.g., health
                    declarations). Owners are solely responsible for ensuring compliance with applicable
                    data privacy regulations.</li>
                </ul>
              </section>

              <section>
                <h3>9. Changes to Terms</h3>
                <p>
                  We reserve the right to update these Terms of Use at any time. Any changes will be
                  communicated via email or through the platform. Your continued use of the platform after any
                  changes will constitute your acceptance of the revised Terms.
                </p>
              </section>
            </div>

            <div className={styles.termsFooter}>
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

export default TermsPopup;