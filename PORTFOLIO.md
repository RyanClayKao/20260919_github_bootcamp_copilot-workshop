![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案從基本的待辦管理開始，逐步加入深色模式、篩選與批次清除等功能，並保留清楚、可直接操作的使用流程。

## 線上展示

[GitHub Pages](https://ryanclaykao.github.io/20260919_github_bootcamp_copilot-workshop/)

## 功能

- 新增待辦事項，空白內容不會被加入清單。
- 勾選待辦事項並標記為完成，完成項目會顯示刪除線並淡化。
- 刪除單筆待辦事項。
- 顯示整體清單的未完成項目數量。
- 清單沒有項目或篩選結果為空時，顯示對應提示文字。
- 使用「全部」、「未完成」與「已完成」篩選待辦事項。
- 清除所有已完成項目，操作前會顯示確認對話框。
- 沒有已完成項目時停用「清除已完成」按鈕。
- 切換淺色與深色模式，並記住使用者的主題偏好。
- 使用者尚未手動選擇主題時，跟隨作業系統的深淺色設定。
- 待辦資料保存於瀏覽器 `localStorage`，重新整理後仍可保留。
- 支援手機螢幕的響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何前端框架或第三方套件。
- 不引用外部 CDN，可離線開啟與操作。
- 使用 CSS 變數管理介面顏色與深色模式配色。
- 使用瀏覽器 `localStorage` 保存待辦資料與主題偏好。

## 開發方式

這個專案在 GitHub Copilot 實戰工作坊中完成，開發過程使用以下方式：

- 使用 GitHub Copilot Agent Mode，根據需求建立待辦清單的頁面結構、樣式與互動功能。
- 透過 MCP 連接 Microsoft Learn 文件服務，以及讀取 GitHub repository 的 issue 資訊。
- 使用 `.github/prompts` 中的 agentic workflow，依照固定步驟讀取 issue、提出修改計畫、建立分支、完成修正、驗證、推送並建立 Pull Request。
- 使用 GitHub issue 作為功能需求與問題修復的工作紀錄。

## 我學到什麼

- 如何把使用者需求拆分成可逐步驗證的前端功能。
- 如何使用 `localStorage` 保存瀏覽器端資料與使用者偏好。
- 如何透過 CSS 變數設計淺色與深色模式。
- 如何讓篩選、空狀態提示與整體統計彼此維持一致。
- 如何結合 Agent Mode、MCP 與 agentic workflow 來整理開發流程。
