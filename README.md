# チーム抽選アプリ 🎲

エレガントなアニメーションとApple風デザインを特徴とする、チーム抽選用Webアプリケーションです。

## 🌐 デモ

以下のURLでアプリケーションを体験できます：
[チーム抽選アプリ](https://akipinnote.github.io/lottery-app-Roo/)

![アプリケーションのスクリーンショット](screenshot.png)

## ✨ 特徴

- **ワンクリック抽選**：
  - シンプルで直感的なインターフェース
  - クリック一つで即座に抽選開始

- **洗練された演出**：
  - スロットマシン風の回転アニメーション
  - スムーズな切り替え効果
  - フラッシュによる視覚的フィードバック

- **モダンなデザイン**：
  - Apple製品にインスパイアされたミニマルなUI
  - 全デバイス対応のレスポンシブデザイン
  - SF Pro Displayによる美しいタイポグラフィ

## 🛠 技術仕様

最新のWeb技術を活用：
- HTML5
- CSS3（GridとFlexbox）
- JavaScript（ES6+）
- ハードウェアアクセラレーション対応アニメーション

### パフォーマンス最適化
- CSSグリッドによる正確なレイアウト
- Transform3Dによるハードウェア支援
- 効率的なDOM操作
- アニメーションタイミングの最適化

## 🚀 導入方法

1. リポジトリのクローン：
```bash
git clone https://github.com/akipinnote/lottery-app-Roo.git
```

2. ブラウザでの起動：
```bash
cd lottery-app-Roo
open index.html
```

ビルド不要で、ブラウザから直接実行できます！

## 📱 使用方法

1. ブラウザでアプリケーションを開く
2. 「Draw Lots」ボタンをクリック
3. アニメーション付きで抽選実行
4. 全メンバーの結果を表示
5. 「Draw Again」で再抽選

## 💻 開発者向け情報

### プロジェクト構造
```
lottery-app/
├── index.html          # メインHTML
├── css/
│   └── style.css      # スタイルとアニメーション
├── js/
│   └── main.js        # コア機能
└── tests/             # Seleniumテスト
```

### テストの実行
```bash
# Python仮想環境のセットアップ
python3 -m venv venv
source venv/bin/activate

# 依存関係のインストール
pip install -r requirements.txt

# テスト実行
python -m unittest tests/test_lottery.py
```

### 主要コンポーネント

- **スロットアニメーションシステム**：
  - CSSグリッドベースのレイアウト
  - Transform活用のアニメーション
  - 正確なタイミング制御

- **抽選結果生成**：
  - Fisher-Yatesシャッフルアルゴリズム
  - 同期アニメーション
  - エラー処理

## 🔧 カスタマイズ

参加者リストの変更は `js/main.js` を編集：
```javascript
const participants = ['Ueda', 'Ojima', 'Maruo', 'Mimura', 'Abe'];
```

## 📄 ライセンス

MITライセンス - 自由に使用・改変可能です。

## 👥 開発者

- 初期開発: Roo
- デザインインスピレーション: Apple.com

## 🤝 コントリビューション

プルリクエスト歓迎します！