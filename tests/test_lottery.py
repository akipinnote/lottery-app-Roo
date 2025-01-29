import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import os
import time

class LotteryAppTest(unittest.TestCase):
    def setUp(self):
        # Chromeオプションの設定
        chrome_options = Options()
        chrome_options.add_argument('--headless')  # ヘッドレスモードで実行
        
        # Chromeドライバーの設定
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # ローカルのHTMLファイルのパスを取得
        current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.html_path = f"file://{current_dir}/index.html"
        self.driver.get(self.html_path)
        
        # スクリーンショット保存用ディレクトリの作成
        os.makedirs('tests/screenshots', exist_ok=True)
        
        # ウィンドウサイズを設定
        self.driver.set_window_size(1200, 800)

    def tearDown(self):
        # スクリーンショットを保存
        self.driver.save_screenshot(f"tests/screenshots/test_{time.strftime('%Y%m%d_%H%M%S')}.png")
        self.driver.quit()

    def wait_for_button_enabled(self, timeout=15):
        """ボタンが有効になるまで待機"""
        wait = WebDriverWait(self.driver, timeout)
        try:
            # ボタンが有効になり、テキストが変更されるのを待つ
            wait.until(lambda d: (
                not d.find_element(By.ID, "startButton").get_property("disabled") and
                d.find_element(By.ID, "startButton").text in ["くじを引く", "もう一度引く"]
            ))
            return True
        except Exception as e:
            print(f"Button enable wait error: {str(e)}")
            return False

    def test_initial_state(self):
        """初期状態のテスト"""
        print("\n実行中: 初期状態のテスト")
        
        # タイトルの確認
        self.assertEqual("くじ引きアプリ", self.driver.title)
        
        # スタートボタンの存在確認
        start_button = self.driver.find_element(By.ID, "startButton")
        self.assertTrue(start_button.is_displayed())
        self.assertEqual("くじを引く", start_button.text)
        
        print("✓ 初期状態のテスト完了")

    def test_lottery_execution(self):
        """くじ引き実行のテスト"""
        print("\n実行中: くじ引き実行のテスト")
        
        # スタートボタンをクリック
        start_button = self.driver.find_element(By.ID, "startButton")
        start_button.click()
        
        # ボタンが無効化されることを確認
        self.assertTrue(start_button.get_property("disabled"))
        self.assertEqual("抽選中...", start_button.text)
        
        # アニメーション完了とボタンの有効化を待機
        self.assertTrue(self.wait_for_button_enabled())
        
        # 結果の表示を確認
        results = self.driver.find_elements(By.CLASS_NAME, "result-item")
        self.assertEqual(5, len(results))
        
        # ボタンのテキストを確認
        self.assertEqual("もう一度引く", start_button.text)
        
        print("✓ くじ引き実行のテスト完了")

    def test_responsive_design(self):
        """レスポンシブデザインのテスト"""
        print("\n実行中: レスポンシブデザインのテスト")
        
        screen_sizes = [
            (375, 667, "スマートフォン"),
            (768, 1024, "タブレット"),
            (1200, 800, "デスクトップ")
        ]
        
        for width, height, device_type in screen_sizes:
            print(f"- {device_type}サイズ ({width}x{height}) をテスト中")
            self.driver.set_window_size(width, height)
            time.sleep(0.5)  # リサイズの完了を待つ
            
            # スタートボタンの表示確認
            start_button = self.driver.find_element(By.ID, "startButton")
            self.assertTrue(start_button.is_displayed())
            
            # スクリーンショットを保存
            self.driver.save_screenshot(f"tests/screenshots/responsive_{device_type}_{time.strftime('%Y%m%d_%H%M%S')}.png")
        
        print("✓ レスポンシブデザインのテスト完了")

    def test_multiple_executions(self):
        """複数回実行のテスト"""
        print("\n実行中: 複数回実行のテスト")
        
        for i in range(3):
            print(f"- {i + 1}回目の実行")
            
            # スタートボタンをクリック
            start_button = self.driver.find_element(By.ID, "startButton")
            start_button.click()
            
            # アニメーション完了とボタンの有効化を待機
            self.assertTrue(self.wait_for_button_enabled())
            
            # 結果の表示を確認
            results = self.driver.find_elements(By.CLASS_NAME, "result-item")
            self.assertEqual(5, len(results))
            
            # スクリーンショットを保存
            self.driver.save_screenshot(f"tests/screenshots/multiple_execution_{i + 1}_{time.strftime('%Y%m%d_%H%M%S')}.png")
            
            # 次の実行の前に少し待機
            time.sleep(1)
        
        print("✓ 複数回実行のテスト完了")

if __name__ == '__main__':
    unittest.main(verbosity=2)