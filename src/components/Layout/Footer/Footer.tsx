import { siteStyles } from '@/constants/styles';
import { siteConfig } from '@/constants/site';

export const Footer = () => {
  return (
    <footer
      style={{ height: siteStyles.footerHeight }}
      className="flex  justify-center items-center"
    >
      <p>© 2026 {siteConfig.description} </p>
    </footer>
  );
};
