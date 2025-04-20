<?php
    if(isset($_GET['page'])) {
        $pages = ["home", "test"];
        if(in_array($_GET['page'], $pages)) {
            echo json_encode(array("success" => true, "page" => htmlspecialchars($_GET['page'])));
        } else {
            echo json_encode(array("error" => "Page " . htmlspecialchars($_GET['page']) . " not found"));
        }
        exit;
    }

    /*if (isset($_GET['page'])) {
        $pages = [
            "home" => "<p>Homepage</p>",
            "test" => "<p>SPA test app</p>",
            "admin" => "<p>Admin</p>"
        ];
    
        $requested = htmlspecialchars($_GET['page']);
    
        if (array_key_exists($requested, $pages)) {
            echo json_encode([
                "success" => true,
                "page" => $requested,
                "html" => base64_encode($pages[$requested])
            ]);
        } else {
            echo json_encode([
                "error" => "Page '" . htmlspecialchars($requested) . "' not found"
            ]);
        }
        exit;
    } */
?>