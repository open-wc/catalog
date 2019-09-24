export function npmIsValidVersion(meta, version) {
  return meta && meta.versions && meta.versions[version];
}

export function npmGetLatestVersion(meta) {
  const versions = Object.keys(meta.versions);
  return versions[versions.length - 1];
}

export function isLatestNpmVersion(meta, version) {
  return npmGetLatestVersion(meta) === version;
}
