import streamlit as st
import pandas as pd
import os


st.set_page_config(page_title="トヨタ一般用品 取付要領書検索", page_icon="🚗", layout="wide")

DB_PATH = "toyota_manuals.db"
APP_PASSWORD = "1111"  # ← パスワードをここで変更してください

# =========================================================================
# カスタムCSS
# =========================================================================
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Noto+Sans+JP:wght@300;400;700&display=swap');

    /* ベース */
    html, body, [class*="css"] {
        font-family: 'Noto Sans JP', 'Rajdhani', sans-serif;
        background-color: #0a0c10;
        color: #e8eaf0;
    }

    /* Streamlitのデフォルト背景を上書き */
    .stApp {
        background-color: #0a0c10;
    }
    section[data-testid="stSidebar"] {
        background-color: #0d0f14;
    }

    /* ヘッダーバー非表示 */
    header[data-testid="stHeader"] {
        background-color: #0a0c10;
    }

    /* ページ全体の余白縮小 */
    .block-container {
        padding-top: 1.5rem !important;
    }

    /* ヒーローセクション */
    .hero-section {
        background: linear-gradient(135deg, #0d0f14 0%, #0a1628 50%, #0a0c10 100%);
        border-bottom: 1px solid rgba(0, 102, 255, 0.2);
        padding: 16px 0 32px;
        margin-bottom: 32px;
        margin-left: -4rem;
        margin-right: -4rem;
        padding-left: 4rem;
        padding-right: 4rem;
        position: relative;
        overflow: hidden;
    }
    .hero-section::before {
        content: '';
        position: absolute;
        top: -40%;
        right: -10%;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%);
        pointer-events: none;
    }
    .hero-eyebrow {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        color: #0066ff;
        text-transform: uppercase;
        margin-bottom: 12px;
    }
    .main-title {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 2.6rem;
        letter-spacing: 0.04em;
        color: #ffffff;
        line-height: 1.1;
        margin-bottom: 12px;
        text-transform: uppercase;
    }
    .main-title span {
        color: #0066ff;
    }
    .hero-subtitle {
        font-size: 0.9rem;
        color: #7a8299;
        font-weight: 300;
        letter-spacing: 0.02em;
    }

    /* 検索セクション */
    .search-label {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.7rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #0066ff;
        font-weight: 600;
        margin-bottom: 6px;
    }
    .stTextInput > div > div > input {
        background: rgba(255, 255, 255, 0.04) !important;
        border: 1px solid rgba(0, 102, 255, 0.25) !important;
        border-radius: 2px !important;
        color: #e8eaf0 !important;
        font-family: 'Noto Sans JP', sans-serif !important;
        font-size: 0.95rem !important;
        padding: 12px 16px !important;
        transition: border-color 0.2s, box-shadow 0.2s !important;
    }
    .stTextInput > div > div > input:focus {
        border-color: #0066ff !important;
        box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.15) !important;
    }
    .stTextInput > div > div > input::placeholder {
        color: #4a5270 !important;
    }
    .stTextInput > label {
        display: none !important;
    }

    /* 件数バー */
    .result-count {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.7rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #4a5270;
        border-top: 1px solid rgba(255,255,255,0.05);
        padding-top: 20px;
        margin-bottom: 16px;
    }
    .result-count strong {
        color: #0066ff;
        font-size: 1rem;
    }

    /* カード */
    .result-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-left: 3px solid #0066ff;
        border-radius: 2px;
        padding: 18px 22px;
        margin-bottom: 8px;
        transition: all 0.25s ease;
        position: relative;
        overflow: hidden;
    }
    .result-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(90deg, rgba(0,102,255,0.04) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.25s;
    }
    .result-card:hover {
        border-color: rgba(255, 255, 255, 0.12);
        border-left-color: #3399ff;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
        transform: translateX(4px);
        background: rgba(255, 255, 255, 0.04);
    }
    .result-card:hover::before {
        opacity: 1;
    }

    /* バッジ */
    .badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 1px;
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-family: 'Rajdhani', sans-serif;
    }

    /* タイトル */
    .item-title {
        font-size: 1.05rem;
        font-weight: 700;
        margin-left: 12px;
        color: #e8eaf0;
        letter-spacing: 0.01em;
    }

    /* メタ情報 */
    .item-meta {
        font-size: 0.8rem;
        color: #4a5270;
        margin-top: 10px;
        display: flex;
        gap: 20px;
        font-family: 'Rajdhani', sans-serif;
        letter-spacing: 0.05em;
    }
    .item-meta strong {
        color: #6a7499;
        text-transform: uppercase;
        font-size: 0.68rem;
    }

    /* PDFボタン */
    .link-button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 20px;
        color: white !important;
        text-decoration: none;
        border-radius: 1px;
        font-weight: 600;
        font-size: 0.78rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-family: 'Rajdhani', sans-serif;
        transition: all 0.2s;
        border: 1px solid rgba(255,255,255,0.15);
        margin-top: 12px;
    }
    .link-button:hover {
        background: rgba(255,255,255,0.1) !important;
        border-color: rgba(255,255,255,0.3);
        letter-spacing: 0.14em;
    }

    /* Streamlit info/warning */
    .stAlert {
        border-radius: 2px !important;
    }

    /* スクロールバー */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #0a0c10; }
    ::-webkit-scrollbar-thumb { background: #1e2236; border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: #0066ff; }

    /* ログイン画面 */
    .login-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 80vh;
        padding: 40px 20px;
    }
    .login-box {
        width: 100%;
        max-width: 420px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(0, 102, 255, 0.2);
        border-radius: 2px;
        padding: 48px 40px 40px;
        position: relative;
    }
    .login-box::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 2px;
        background: linear-gradient(90deg, #0066ff, #3399ff);
    }
    .login-logo {
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.6rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #ffffff;
        margin-bottom: 4px;
    }
    .login-logo span { color: #0066ff; }
    .login-sub {
        font-size: 0.72rem;
        color: #4a5270;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        font-family: 'Rajdhani', sans-serif;
        margin-bottom: 36px;
    }
    .login-label {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.68rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #0066ff;
        font-weight: 600;
        margin-bottom: 6px;
    }
    .login-error {
        font-size: 0.78rem;
        color: #ff6666;
        letter-spacing: 0.05em;
        margin-top: 12px;
        font-family: 'Rajdhani', sans-serif;
    }

    /* スマホ・タブレット用レスポンシブ対応 */
    @media (max-width: 768px) {
        .block-container {
            padding-top: 3.5rem !important; /* ヘッダーメニューとの被りを防ぐ */
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
            padding-bottom: 3rem !important;
        }
        .hero-section {
            margin-left: -1.25rem;
            margin-right: -1.25rem;
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            padding-top: 10px;
            padding-bottom: 24px;
        }
        .main-title {
            font-size: 1.55rem; /* 1行に収まるようにサイズを調整 */
            line-height: 1.3;
        }
        .result-card {
            padding: 14px 16px;
        }
        .item-title {
            font-size: 0.95rem;
            line-height: 1.4;
            margin-bottom: 4px;
        }
        .item-meta {
            flex-direction: column;
            gap: 6px;
        }
        .login-box {
            padding: 32px 24px 24px;
        }
        .login-logo {
            font-size: 1.3rem;
        }
    }
</style>
""", unsafe_allow_html=True)

# =========================================================================
# データ読み込み関数
# =========================================================================
DATA_PATH = "data.json"

def check_data_exists():
    return os.path.exists(DATA_PATH)

from thefuzz import fuzz

@st.cache_data
def load_all_manuals():
    if not check_data_exists():
        return pd.DataFrame()
    return pd.read_json(DATA_PATH)

def fetch_search_results(search_query):
    df = load_all_manuals()
    if df.empty:
        return df

    # スコア計算
    # 検索クエリをスペースで分割し、各キーワードがターゲット文字列にどれだけ含まれているか（partial_ratio）を計算
    # 全キーワードのスコアの平均（または最小値）をとることで、AND検索としての精度を上げる
    def calc_score(row):
        target = f"{row['car_name']} {row['accessory_name']} {row['part_number']}"
        keywords = search_query.split()
        if not keywords:
            return 0
        scores = [fuzz.partial_ratio(kw, target) for kw in keywords]
        
        # キーワードが複数ある場合、すべてがある程度マッチしていることを重視するため平均をとる
        avg_score = sum(scores) / len(scores)
        
        # さらに、全くマッチしていないキーワード（スコアが低すぎるもの）がある場合は全体スコアを下げるペナルティ
        min_score = min(scores)
        if min_score < 50:
            avg_score -= 20
            
        return avg_score

    df['score'] = df.apply(calc_score, axis=1)
    
    # スコアが高いものをフィルタリング（例: 70点以上）し、スコア順にソート
    results = df[df['score'] >= 70].sort_values(by='score', ascending=False).head(100)
    return results

# =========================================================================
# UI 構築
# =========================================================================

# ---- ログイン認証 ----
if "authenticated" not in st.session_state:
    st.session_state["authenticated"] = False

if not st.session_state["authenticated"]:
    st.markdown('<div class="login-wrapper">', unsafe_allow_html=True)
    st.markdown("""
    <div class="login-box">
        <div class="login-logo">一般用品取付要領書</div>
        <div class="login-sub">Toyota / Lexus Accessories — Secure Access</div>
    </div>
    """, unsafe_allow_html=True)

    # ログインフォーム
    with st.form("login_form", clear_on_submit=True):
        st.markdown('<div class="login-label">— Password</div>', unsafe_allow_html=True)
        password_input = st.text_input("", type="password", placeholder="パスワードを入力してください", label_visibility="collapsed")
        submitted = st.form_submit_button("ログイン", use_container_width=True)

        if submitted:
            if password_input == APP_PASSWORD:
                st.session_state["authenticated"] = True
                st.rerun()
            else:
                st.markdown('<div class="login-error">✕ パスワードが正しくありません</div>', unsafe_allow_html=True)

    st.markdown('</div>', unsafe_allow_html=True)
    st.stop()

# ---- 認証済み：メイン画面 ----
st.markdown("""
<div class="hero-section">
    <div class="hero-eyebrow">Toyota / Lexus Accessories</div>
    <h1 class="main-title">一般用品取付要領書</h1>
</div>
""", unsafe_allow_html=True)

if not check_data_exists():
    st.warning("データベースが見つかりません。まずはローカルでデータを構築するため、スクレイパーを実行してください。")
    if st.button("データを更新する (スクレイパー実行)"):
        with st.spinner("データを取得中です...しばらくお待ちください。"):
            import subprocess
            subprocess.run(["python", "scraper.py"])
            st.success("データ取得が完了しました！リロードしてください。")
            st.rerun()
    st.stop()

# レイアウト設定
with st.container():
    st.markdown('<div class="search-label">— Search Documents</div>', unsafe_allow_html=True)

    if "search_input" not in st.session_state:
        st.session_state["search_input"] = ""

    st.text_input("キーワードを入力（スペース区切りでAND検索 / 例: アルファード イルミ）", key="search_input",
                  placeholder="キーワードを入力  / 例: アルファード イルミ")

    search_query = st.session_state["search_input"]

    if search_query:
        results = fetch_search_results(search_query)

        st.markdown(f'<div class="result-count">Results &nbsp; <strong>{len(results)}</strong> &nbsp; documents found</div>', unsafe_allow_html=True)

        if not results.empty:
            for idx, row in results.iterrows():
                with st.container():
                    file_name = row.get('file_name', '')
                    badge_colors = {
                        '取付要領書': ('#1a2a4a', '#4d9fff'),
                        '取扱書':    ('#1a2a4a', '#4d9fff'),
                        '型紙':      ('#1a1a2a', '#9966ff'),
                        '参考資料':  ('#1a2a1a', '#44cc88'),
                        '動画':      ('#1a2a2a', '#00cccc'),
                        '検査要領書':('#2a1a1a', '#ff6666'),
                    }
                    bg_color, fg_color = badge_colors.get(file_name, ('#1e2236', '#7a8299'))

                    st.markdown(f"""
                    <div class="result-card">
                        <div style="display: flex; align-items: center; margin-bottom: 6px;">
                            <span class="badge" style="background: {bg_color}; color: {fg_color};">{file_name}</span>
                            <span class="item-title">{row['car_name']} — {row['accessory_name']}</span>
                        </div>
                        <div class="item-meta">
                            <span><strong>Brand&nbsp;</strong> {row['brand']}</span>
                            <span><strong>Part No.&nbsp;</strong> {row['part_number']}</span>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)

                    btn_label = f"Open {file_name} (PDF)" if file_name else "Open Document (PDF)"
                    link_html = f'''
                    <a href="{row['manual_url']}" target="_blank" class="link-button" style="background: linear-gradient(90deg, #0a1628, #0d2040);">
                        ↗ {btn_label}
                    </a>
                    '''
                    st.markdown(link_html, unsafe_allow_html=True)
                    st.write("")
        else:
            st.info("該当するデータがありません。")

# お気に入りサイドバーは非表示にしました。