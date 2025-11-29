import Image from "next/image";

import styles from "@/styles/ClientLogoGrid.module.css";
import { ClientLogo } from "@/types/web-dev-design";

interface ClientLogoGridProps {
  logos: ClientLogo[];
}

const ClientLogoGrid = ({ logos }: ClientLogoGridProps) => (
  <div className={styles.grid}>
    {logos.map((logo) => {
      const content = (
        <>
          {/* <Image src={logo.logo} alt={logo.name} width={200} height={80} /> */}
          <span>{logo.name}</span>
        </>
      );

      return <div key={logo.name} className={styles.logoCard}>
        {content}
      </div>
    })}
  </div>
);

export default ClientLogoGrid;
