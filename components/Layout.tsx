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
            width={125}
            height={25}
          />
          <MenuIcon fontSize="large" />
        </header>
      </div>
      {props.children}
    </>
  );
}
