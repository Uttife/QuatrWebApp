
<html>
<head>
    <title>Property Upload Form</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Quatr Property Upload</h1>
        <form id="propertyForm" class="green-theme">
            <label for="description">Description:</label>
            <input type="text" id="description" name="description" required><br><br>

            <label for="rent">Rent:</label>
            <input type="number" id="rent" name="rent" required><br><br>

            <label for="address">Address:</label>
            <input type="text" id="address" name="address" required><br><br>
            <input type="file" id="image" name="image" accept="image/*" multiple><br><br>
            <button type="submit" class="submit-button">Submit Property</button>
        </form>
    </div>

    <!-- Circular Progress Bar Container -->
    <div class="circular-progress-container">
        <div class="circular-progress" id="circularProgress"></div>
    </div>

    <script type="module" src="main.js"></script>

</body>
</html>
