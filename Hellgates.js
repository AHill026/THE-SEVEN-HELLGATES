

 // ============================================
 // THE SEVEN HELLGATES
 // CHAPTER PROGRESSION SYSTEM
 // ============================================

export function createHellgates({
  limboEnvironment,
  gluttonyEnvironment,
  showMessage,
  onChapterChange
}) {
  // Accept either a group or the object returned
  // by createGluttonyEnvironment().
  const gluttonyGroup =
    gluttonyEnvironment?.environment || gluttonyEnvironment;

  const chapters = [
    {
      id: 'limbo',
      name: 'CHAPTER I — LIMBO',
      gateName: 'THE FIRST HELLGATE',
      unlocked: true,
      environment: limboEnvironment
    },
    {
      id: 'gluttony',
      name: 'CHAPTER II — THE MAW OF ENDLESS HUNGER',
      gateName: 'THE GATE OF GLUTTONY',
      unlocked: false,
      environment: gluttonyGroup
    },
    { id: 'greed', name: 'CHAPTER III — GREED', unlocked: false },
    { id: 'wrath', name: 'CHAPTER IV — WRATH', unlocked: false },
    { id: 'heresy', name: 'CHAPTER V — HERESY', unlocked: false },
    { id: 'violence', name: 'CHAPTER VI — VIOLENCE', unlocked: false },
    { id: 'treachery', name: 'CHAPTER VII — TREACHERY', unlocked: false }
  ];

  let currentChapter = 0;

  function enterChapter(index) {
    const chapter = chapters[index];

    if (!chapter || !chapter.unlocked) {
      showMessage?.('THIS HELLGATE IS SEALED');
      return false;
    }

    chapters.forEach((item, i) => {
      if (item.environment) {
        item.environment.visible = i === index;
      }
    });

    currentChapter = index;

    showMessage?.(chapter.name);
    onChapterChange?.(chapter);

    return true;
  }

  function unlockChapter(index) {
    if (!chapters[index]) return false;

    chapters[index].unlocked = true;

    showMessage?.(
      chapters[index].gateName + ' — UNLOCKED'
    );

    return true;
  }

  function completeCurrentChapter() {
    const nextIndex = currentChapter + 1;

    if (nextIndex >= chapters.length) {
      showMessage?.('THE SEVEN HELLGATES — COMPLETED');
      return false;
    }

    unlockChapter(nextIndex);
    return enterChapter(nextIndex);
  }

  function getCurrentChapter() {
    return chapters[currentChapter];
  }

  function getChapters() {
    return chapters;
  }

  return {
    enterChapter,
    unlockChapter,
    completeCurrentChapter,
    getCurrentChapter,
    getChapters
  };
}
