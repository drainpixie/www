{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    hooks.url = "github:cachix/git-hooks.nix";
  };

  outputs = {
    self,
    hooks,
    nixpkgs,
  }: let
    supportedSystems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];

    forAllSystems = f:
      nixpkgs.lib.genAttrs supportedSystems (system:
        f {
          pkgs = nixpkgs.legacyPackages.${system};
          inherit system;
        });
  in {
    lib = forAllSystems ({pkgs, ...}: {withEnv = pkgs.callPackage ./site.nix;});
    packages = forAllSystems ({pkgs, ...}: {default = pkgs.callPackage ./site.nix {};});

    devShells = forAllSystems ({
      pkgs,
      system,
    }: let
      check = self.checks.${system}.pre-commit;
    in {
      default = pkgs.mkShell {
        inherit (check) shellHook;
        buildInputs =
          builtins.attrValues {
            inherit (pkgs) nodejs pnpm;
          }
          ++ check.enabledPackages;
      };
    });

    checks = forAllSystems ({
      pkgs,
      system,
    }: {
      pre-commit = hooks.lib.${system}.run {
        src = ./.;
        package = pkgs.prek;

        hooks = {
          eslint = {
            enable = true;
            entry = "pnpm eslint";
            files = "\\.(ts|js|tsx|jsx)$";
          };

          prettier = {
            enable = true;
            excludes = ["flake.lock"];
          };

          statix.enable = true;
          convco.enable = true;
          alejandra.enable = true;
        };
      };
    });
  };
}
