import * as React from 'react'
import styles from './HappyBirthdays.module.scss'
import { IHappyBirthdaysProps } from './IHappyBirthdaysProps'
// import { escape } from '@microsoft/sp-lodash-subset';
import Webpart from './Webpart'
import useConfig from './../hooks/useConfig'

// DEFAULT COMPONENT
// export default class HappyBirthdays extends React.Component<
//   IHappyBirthdaysProps,
//   {}
// > {
//   public render(): React.ReactElement<IHappyBirthdaysProps> {
//     const {
//       description,
//       isDarkTheme,
//       environmentMessage,
//       hasTeamsContext,
//       userDisplayName,
//       userEmail,
//     } = this.props;

//     return (
//       <section
//         className={`${styles.happyBirthdays} ${
//           hasTeamsContext ? styles.teams : ''
//         }`}
//       >
//         <h1>Bienvenido {escape(userDisplayName)}</h1>
//       </section>
//     );
//   }
// }

function HappyBirthdays({
  hasTeamsContext,
  userDisplayName,
  userEmail,
}: IHappyBirthdaysProps) {
  const { isLoading, fail, birthdays, settings } = useConfig()
  const user = { username: userDisplayName, email: userEmail }

  React.useEffect(() => {
    const invertalID = setInterval(() => {
      localStorage.removeItem('config')
      localStorage.removeItem('birthdays')
    }, 1000 * 60 * 10)

    return () => {
      clearInterval(invertalID)
    }
  }, [])

  return (
    <section
      className={`${styles.happyBirthdays} ${
        hasTeamsContext ? styles.teams : ''
      }`}
    >
      {isLoading && <h3>Cargando...</h3>}
      {fail && <h3>Error: {fail}</h3>}
      {settings && (
        <Webpart settings={settings} birthdays={birthdays} currentUser={user} />
      )}
    </section>
  )
}

export default HappyBirthdays
