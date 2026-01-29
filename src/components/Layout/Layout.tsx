import { Header } from './Header';
import { Footer } from './Footer';
import { Title } from './Title';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-col max-w-[1024px] mx-auto px-[24px] justify-start items-center">
          <Title />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
