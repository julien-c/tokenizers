const { asciiFoldingTokenizer } = require('../src/tokenizer');

describe('asciifolding tokenizer', () => {
  it('without argument', () => {
    expect(asciiFoldingTokenizer()).toEqual([]);
  });

  it('Cái nồi gì thế?', () => {
    expect(asciiFoldingTokenizer('Cái nồi gì thế?')).toEqual(['cai', 'noi', 'gi', 'the']);
  });

  it('Is this déjà vu?', () => {
    expect(asciiFoldingTokenizer('Is this déjà vu?')).toEqual(['is', 'this', 'deja', 'vu']);
  });

  it('My œsophagus caused a débâcle', () => {
    expect(asciiFoldingTokenizer('My œsophagus caused a débâcle'))
      .toEqual(['my', 'oesophagus', 'caused', 'a', 'debacle']);
  });

  it('صفحة أسيا أما بـ, حيث.', () => {
    expect(asciiFoldingTokenizer('صفحة أسيا أما بـ, حيث.'))
      .toEqual(['صفحة', 'أسيا', 'أما', 'بـ', 'حيث']);
  });

  it('禁前自後民渡谷紹判設岐応。原感夢曜図会低座図郵狙回策強今品位読人続。', () => {
    expect(asciiFoldingTokenizer('禁前自後民渡谷紹判設岐応。原感夢曜図会低座図郵狙回策強今品位読人続。'))
      .toEqual(['禁', '前', '自', '後', '民', '渡', '谷', '紹', '判', '設', '岐', '応', '原', '感', '夢', '曜', '図', '会', '低', '座', '図', '郵', '狙', '回', '策', '強', '今', '品', '位', '読', '人', '続']);
  });

  it('äußerst', () => {
    expect(asciiFoldingTokenizer('äußerst')).toEqual(['ausserst']);
  });

  it.skip("John's", () => {
    expect(asciiFoldingTokenizer("John's")).toEqual('John');
  });

  it.skip("l'église", () => {
    expect(asciiFoldingTokenizer("l'église")).toEqual('eglis');
  });

  it.skip('Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉO', () => {
    expect(asciiFoldingTokenizer('Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉO')).toEqual(['iлternationɑlizati߀ԉo']);
  });
});
