# textlint-rule MS Japanese Style Guide Modoki

Microsoft [Japanese Style Guide](http://download.microsoft.com/download/b/3/4/b34f7185-afca-4846-8fbf-672a1b9afce2/jpn-jpn-styleguide.pdf) のチェックを行うツール beta

## 機能

### 半角スペースチェック

半角英数字と全角文字列の間には、半角スペースが必要

```diff
- ID␣を表示
+ ID を表示
```

ただし、`「」` または `””`, `‘’`、の内部が英数字でも空白は不要。

```diff
- ID␣を表示
+ ID を表示

+ 「Azure」
+ ”Microsoft”
+ ‘Office 365’
```

`:` の前には空白は不要

```diff
+ データベース: ‘%s’
```

 (空白があってもエラーは出ない)

```diff
+ データベース : ‘%s’
```

英語で 2 単語以上であるカタカナ語は、英語の単語分割に合わせて半角スペースが必要。
[katakana_space.json](./src/katakana_space/katakana_space.json) の単語リストに対し、半角スペースが不足していないかチェックする。

```diff
- ダイアログボックス
+ ダイアログ ボックス
```

### 長音のチェック

[chouon.json](./src/chouon/chouon.json) の単語リストに対し、長音が不足していないかチェックする。
