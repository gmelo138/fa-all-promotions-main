const fs = require('fs');

// Get preset config
const presetConfig = {
  types: [
    {
      type: 'BREAKING CHANGE',
      section: '💥 BREAKING CHANGES',
    },
    {
      type: 'feat',
      section: '🚀 Features',
    },
    {
      type: 'fix',
      section: '🐛 Bugfixes',
    },
    {
      type: 'build',
      section: '♻️ Updated dependencies',
    },
    {
      type: 'docs',
      section: '📝 Docs',
    },
  ],
};

const getFeatureType = (feature) => {
  return presetConfig.types.find((type) => type.section.includes(feature));
};

const MAX_RELEASES = 5;
let totalReleases = 0;

// Read changelog.md file
fs.readFile('CHANGELOG.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse changelog content
  const releases = [];
  const versionRegex = /^#{2,3} \[(.*?)\]\((.*?)\) \((.*?)\)$/;
  const featureGroupRegex = /^### \S+ ([\w|\s]+)$/;
  const commitRegex = /^\* (.+)$/;

  data.split('\n').forEach((line) => {
    const versionMatch = line.match(versionRegex);
    const featureGroupMatch = line.match(featureGroupRegex);
    if (releases.length >= MAX_RELEASES) {
      if (versionMatch) {
        totalReleases++;
      }
      return;
    }
    if (versionMatch) {
      const version = versionMatch[1];
      const compareUrl = versionMatch[2];
      const date = versionMatch[3];
      const release = {
        version,
        date,
        commitGroups: [],
        compareUrl,
      };
      totalReleases++;
      releases.push(release);
    } else if (featureGroupMatch) {
      const feature = getFeatureType(featureGroupMatch[1]);
      const featureGroup = {
        ...feature,
        title: featureGroupMatch[1],
        commits: [],
      };
      releases[releases.length - 1].commitGroups.push(featureGroup);
    } else {
      const commitMatch = line.match(commitRegex);
      if (commitMatch) {
        const subject = commitMatch[1];
        const currentReleaseIndex = releases.length - 1;
        const currentFeatureGroupIndex = releases[currentReleaseIndex].commitGroups.length - 1;
        releases[currentReleaseIndex].commitGroups[currentFeatureGroupIndex].commits.push(subject);
      }
    }
  });

  // Save releases to changelog.json
  fs.writeFile('changelog.json', JSON.stringify({ releases, totalReleases }, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Changelog converted successfully!');
    }
  });
});
