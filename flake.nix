{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
    hooks.url = "github:cachix/git-hooks.nix";
  };

  outputs = {
    self,
    utils,
    hooks,
    nixpkgs,
  }:
    utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        check = self.checks.${system}.pre-commit-check;
      in {
        packages.default = pkgs.callPackage ./site.nix {};

        devShell = pkgs.mkShell {
          inherit (check) shellHook;
          buildInputs =
            builtins.attrValues {
              inherit (pkgs) nodejs pnpm;
            }
            ++ check.enabledPackages;
        };

        checks = {
          pre-commit-check = hooks.lib.${system}.run {
            src = ./.;
            hooks = {
              convco.enable = true;
              eslint.enable = true;
              prettier.enable = true;
              alejandra.enable = true;
            };
          };
        };
      }
    );
}
