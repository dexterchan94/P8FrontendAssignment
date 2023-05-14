import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import s from "./Layout.module.css";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <div className={s.headerContainer}>
        <header className={`page-width ${s.header}`}>
          <Image
            src="/p8Wordmark_sm.svg"
            alt="Produce8 Logo"
            width={100}
            height={20}
          />
          <MenuIcon />
        </header>
      </div>
      {props.children}
    </>
  );
}
