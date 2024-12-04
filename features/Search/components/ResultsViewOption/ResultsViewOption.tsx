import React from 'react'
import styles from './styles.module.css'

const ResultsViewOption = ({
  options=[],
}: {
  options: {
    id: number;
    children: React.ReactNode;
  }[];
}) => {
  return <>
    <section className={styles.listing__View}>
      {
        React.Children.toArray(options.map(action => {
          return <section 
            className={styles.view__Option__Wrap}
            key={action.id}
          >
            {action.children}
          </section>
        }))
      }
    </section>
  </>
}

export default ResultsViewOption