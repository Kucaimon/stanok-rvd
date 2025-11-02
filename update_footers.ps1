# PowerShell script to update footers on all pages
$htmlFiles = Get-ChildItem -Path "pages" -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if footer already has footer-content
    if ($content -match 'footer-content') {
        continue
    }
    
    # Determine relative path to images based on file depth
    $depth = ($file.FullName -split '[\\/]').Count - ($file.FullName -split '[\\/]' | Select-String -Pattern '^pages$' | Measure-Object).Count
    
    # Calculate path to images
    $relativePath = ""
    if ($file.DirectoryName -like "*pages\spravka*" -or $file.DirectoryName -like "*pages\products\*") {
        $relativePath = "../../../images/logo.png"
    } elseif ($file.DirectoryName -like "*pages\*") {
        $relativePath = "../images/logo.png"
    } else {
        $relativePath = "images/logo.png"
    }
    
    # Pattern 1: Footer with ../../../ paths (3 levels deep)
    $pattern1 = '(?s)<footer class="footer">\s*<div class="container">\s*<div class="footer-nav">\s*<a href="../../../index\.html".*?</footer>'
    $replacement1 = @"
<footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src="../../../images/logo.png" alt="Логотип компании" class="footer-logo-img" />
          </div>
          <div class="footer-nav">
            <a href="../../../index.html" class="footer-link">Главная</a>
            <a href="../../../pages/certificate.html" class="footer-link">Сертификаты</a>
            <a href="../../../pages/spravka.html" class="footer-link">Справочник</a>
            <a href="../../../pages/contact.html" class="footer-link">Контакты</a>
            <a href="../../../pages/order.html" class="footer-link">Заказ с сайта</a>
          </div>
        </div>
        <div class="footer-copyright">
          Copyright © 2011-2025. Оборудование для производства РВД
        </div>
      </div>
    </footer>
"@
    
    # Pattern 2: Footer with ../../ paths (2 levels deep - spravka subpages)
    $pattern2 = '(?s)<footer class="footer">\s*<div class="container">\s*<div class="footer-nav">\s*<a href="../../.*?</footer>'
    $replacement2 = @"
<footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src="../../images/logo.png" alt="Логотип компании" class="footer-logo-img" />
          </div>
          <div class="footer-nav">
            <a href="../../index.html" class="footer-link">Главная</a>
            <a href="../../pages/certificate.html" class="footer-link">Сертификаты</a>
            <a href="../../pages/spravka.html" class="footer-link">Справочник</a>
            <a href="../../pages/contact.html" class="footer-link">Контакты</a>
            <a href="../../pages/order.html" class="footer-link">Заказ с сайта</a>
          </div>
        </div>
        <div class="footer-copyright">
          Copyright © 2011-2025. Оборудование для производства РВД
        </div>
      </div>
    </footer>
"@
    
    # Pattern 3: Footer with ../ paths (1 level deep)
    $pattern3 = '(?s)<footer class="footer">\s*<div class="container">\s*<div class="footer-nav">\s*<a href="\.\./.*?</footer>'
    $replacement3 = @"
<footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src="../images/logo.png" alt="Логотип компании" class="footer-logo-img" />
          </div>
          <div class="footer-nav">
            <a href="../index.html" class="footer-link">Главная</a>
            <a href="../pages/certificate.html" class="footer-link">Сертификаты</a>
            <a href="../pages/spravka.html" class="footer-link">Справочник</a>
            <a href="../pages/contact.html" class="footer-link">Контакты</a>
            <a href="../pages/order.html" class="footer-link">Заказ с сайта</a>
          </div>
        </div>
        <div class="footer-copyright">
          Copyright © 2011-2025. Оборудование для производства РВД
        </div>
      </div>
    </footer>
"@
    
    $updated = $false
    
    # Try to match and replace
    if ($content -match $pattern1) {
        $content = $content -replace $pattern1, $replacement1
        $updated = $true
    } elseif ($content -match $pattern2) {
        $content = $content -replace $pattern2, $replacement2
        $updated = $true
    } elseif ($content -match $pattern3) {
        $content = $content -replace $pattern3, $replacement3
        $updated = $true
    }
    
    if ($updated) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Output "Updated: $($file.Name)"
    }
}

Write-Output "Footer update complete!"

