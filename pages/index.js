import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
// import { useCookies } from "react-cookie";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [baseList, setBaseList] = useState(false);
  const [base, setBase] = useState("");
  const [baseSelectioned, setBaseSelectioned] = useState(false);

  // const [cookies, setCookie] = useCookies(["session"]);

  // console.log(cookies, "cookies");

  const handleListBase = () => {
    fetch(`https://141.95.150.29/api/list_base?session=${token}`, {
      method: "GET",
      credentials: "include",
    }).then(async (res) => {
      const recep = await res.json();
      setBase(recep.result["Projet 1"]);
      setBaseList(true);
      console.log(recep.result["Projet 1"]);
    });
  };

  const chooseListBase = () => {
    fetch(`https://141.95.150.29/api/use_base?session=${token}`, {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams({
        base: base,
      }),
    }).then(async (res) => {
      const recep = await res.json();
      console.log("base selectionné", recep);
      setBaseSelectioned(true);
    });
  };

  const handleLogin = () => {
    if (!mail || !password) {
      return;
    }

    fetch("https://141.95.150.29/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: mail,
        password: password,
      }),
    })
      .then(async (res) => {
        const recep = await res.json();
        setIsLogged(true);
        setToken(recep.token);
        console.log("token->", recep.token);
        console.log(recep);
      })
      .catch((e) => {
        console.log("error ->", e);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <div
            style={{ width: "100px", height: "100px", position: "relative" }}
          >
            <Image
              src="/logo-gp-app.png"
              alt="Logo Iphoto"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </h1>
        <div className="block-gene-test">
          {!isLogged && (
            <div className="login">
              <input
                onChange={(e) => {
                  setMail(e.currentTarget.value);
                }}
                type="text"
              ></input>
              <input
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                type="password"
              ></input>
              <button onClick={handleLogin}>login</button>
            </div>
          )}
          {isLogged && (
            <div className="login">
              <button onClick={handleListBase}>
                lancer recherche list base
              </button>
            </div>
          )}
          {baseList && <div className="base-donne" onClick={chooseListBase}>{base}</div>}
          {baseSelectioned && <div>Base selectionné</div>}
        </div>
      </main>
    </div>
  );
}
