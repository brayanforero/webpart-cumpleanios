import * as React from 'react';
import styles from './HappyBirthdays.module.scss';
import { IHappyBirthdaysProps } from './IHappyBirthdaysProps';
// import { escape } from '@microsoft/sp-lodash-subset';
// import { Web } from 'sp-pnp-js/lib/sharepoint/webs';
import Webpart from './Webpart';

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
  const user = { username: userDisplayName, email: userEmail };
  return (
    <section
      className={`${styles.happyBirthdays} ${
        hasTeamsContext ? styles.teams : ''
      }`}
    >
      <Webpart currentUser={user} />
    </section>
  );
}

export default HappyBirthdays;
