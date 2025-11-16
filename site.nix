{
  lib,
  stdenv,
  pnpm,
  nodejs,
  typescript,
}:
stdenv.mkDerivation (final: let
  manifest = lib.importJSON ./package.json;
in {
  src = ./.;
  pname = manifest.name;
  version = manifest.version;

  # WARN: Only for semver, not worth the hassle
  dontCheckForBrokenSymlinks = true;

  pnpmDeps = pnpm.fetchDeps {
    inherit (final) pname src;

    hash = "sha256-rtWkikIdaehSdsu9NPYjpyrDOmaGHpFZ0P0pX2t76s4=";
    fetcherVersion = 2;
  };

  nativeBuildInputs = [nodejs typescript pnpm.configHook];
  buildPhase = ''
    runHook preBuild

    pnpm run build
    cp -r .next/standalone $out
    cp -r .next/static $out/.next

    runHook postBuild
  '';

  env.NODE_ENV = "production";
})
