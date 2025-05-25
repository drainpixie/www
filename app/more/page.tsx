import Age from "@/components/age";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Some more info on me.</p>
      </div>

      <div>
        <h2>Fun Facts</h2>
        <ul className="[&>*]:list-[square]">
          <li>I speak multiple languages</li>
          <li>I play Pokémon competitively</li>
          <li>
            I&apos;m <Age birthday={new Date(2006, 5, 13)} /> years old
          </li>
          <li>
            I enjoy{" "}
            <a
              href="http://last.fm/user/pinkcig_"
              target="_blank"
              rel="noopener noreferrer"
            >
              all
            </a>{" "}
            kinds of music genres
          </li>
          <li>I can type an average of 150 words per minute</li>
          <li>
            My favourite colour is{" "}
            <span className="px-1 py-[0.1em] bg-favourite">
              oklch(0.8398 0.0561 5.82)
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h2>Hardware</h2>
        <ul className="[&>*]:list-[square]">
          <li>iPhone 13</li>
          <li>Moondrop CHU II</li>
          <li>Nintendo DSi Red</li>
          <li>PlayStation 4 Slim</li>
          <li>DELL Latitude 5490</li>
          <li>Nintendo DSi XL Burgundy</li>
          <li>Nintendo 2DS Red Groudon</li>
        </ul>
      </div>

      <div>
        <h2>Software</h2>
        <ul className="[&>*]:list-[square]">
          <li>
            <a
              href="https://www.gnu.org/software/bash/"
              target="_blank"
              rel="noopener"
            >
              Bash
            </a>
          </li>
          <li>
            <a href="https://nixos.org/" target="_blank" rel="noopener">
              NixOS
            </a>
          </li>
          <li>
            <a href="https://neovim.io/" target="_blank" rel="noopener">
              Neovim
            </a>{" "}
          </li>
          <li>
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener"
            >
              Chrome
            </a>
          </li>
          <li>
            <a
              href="https://github.com/alacritty/alacritty"
              target="_blank"
              rel="noopener"
            >
              Alacritty
            </a>
          </li>
          <li>
            <a
              href="https://github.com/nix-community/nix-direnv"
              target="_blank"
              rel="noopener"
            >
              Nix Direnv
            </a>
          </li>
          <li>
            <a
              href="https://github.com/nix-community/home-manager"
              target="_blank"
              rel="noopener"
            >
              Home Manager
            </a>
          </li>
          <li>
            <a
              href="https://github.com/BurntSushi/ripgrep"
              target="_blank"
              rel="noopener"
            >
              Ripgrep
            </a>
            ,{" "}
            <a
              href="https://github.com/eza-community/eza"
              target="_blank"
              rel="noopener"
            >
              eza
            </a>
            ,{" "}
            <a
              href="https://github.com/junegunn/fzf"
              target="_blank"
              rel="noopener"
            >
              fzf
            </a>
            ,{" "}
            <a
              href="https://github.com/ajeetdsouza/zoxide"
              target="_blank"
              rel="noopener"
            >
              zoxide
            </a>
            ,{" "}
            <a
              href="https://github.com/direnv/direnv"
              target="_blank"
              rel="noopener"
            >
              direnv
            </a>
            ,{" "}
            <a
              href="https://github.com/sharkdp/bat"
              target="_blank"
              rel="noopener"
            >
              bat
            </a>
            ,{" "}
            <a
              href="https://github.com/cococonscious/koji"
              target="_blank"
              rel="noopener"
            >
              koji
            </a>
            ,{" "}
            <a
              href="https://github.com/XAMPPRocky/tokei"
              target="_blank"
              rel="noopener"
            >
              tokei
            </a>
            ,{" "}
            <a
              href="https://github.com/strace/strace"
              target="_blank"
              rel="noopener"
            >
              strace
            </a>
            ,{" "}
            <a
              href="https://github.com/bootandy/dust"
              target="_blank"
              rel="noopener"
            >
              dust
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
