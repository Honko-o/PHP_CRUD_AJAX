<?php
    require("dbcon.php");

    function RespondWithJson($statusCode, $message, $data = [])
    {
        $res = [
            'status' => $statusCode,
            'message' => $message,
            'data' => $data,
        ];

        echo json_encode($res);
    }

    if (isset($_GET['student_id'])) {
        $student_id = mysqli_real_escape_string($con, $_GET['student_id']);

        $query = "SELECT * FROM students WHERE id = '$student_id'";
        $query_run = mysqli_query($con, $query);

        if (mysqli_num_rows($query_run) === 1) {
            $student = mysqli_fetch_array($query_run);

            RespondWithJson(200, "Student with ID = '$student_id' is Fetched Successfully.", $student);

            return true;
        } else {
            RespondWithJson(404, "Student with ID = '$student_id' Doesn't Exist.");

            return false;
        }
    }

    if (isset($_POST['save_student'])) {

        $name = mysqli_real_escape_string($con, $_POST['name']);
        $email = mysqli_real_escape_string($con, $_POST['email']);
        $phone = mysqli_real_escape_string($con, $_POST['phone']);
        $course = mysqli_real_escape_string($con, $_POST['course']);

        if ($name == NULL || $email == NULL || $phone == NULL || $course == NULL) {
            RespondWithJson(422, 'All Fields are mandatory');

            return false;
        }

        $query = "INSERT INTO students (name, email, phone, course) VALUES ('$name', '$email', '$phone', '$course')";
        $query_run = mysqli_query($con, $query);

        if ($query_run) {
            RespondWithJson(200, 'Student Created Successfully');

            return;
        } else {
            RespondWithJson(500, 'Failed to Create Student');

            return false;
        }

    }

    if (isset($_POST['update_student'])) {
        $student_id = mysqli_real_escape_string($con, $_POST['student_id']);
        $name = mysqli_real_escape_string($con, $_POST['name']);
        $email = mysqli_real_escape_string($con, $_POST['email']);
        $phone = mysqli_real_escape_string($con, $_POST['phone']);
        $course = mysqli_real_escape_string($con, $_POST['course']);

        if ($name == NULL || $email == NULL || $phone == NULL || $course == NULL) {
            RespondWithJson(422, 'All Fields are mandatory');

            return false;
        }

        $query = "UPDATE students 
                    SET name='$name',
                        email='$email',
                        phone='$phone',
                        course='$course'
                    WHERE id='$student_id'";
        $query_run = mysqli_query($con, $query);

        if ($query_run) {
            RespondWithJson(200, 'Student Updated Successfully');

            return;
        } else {
            RespondWithJson(500, 'Failed to Update Student');

            return false;
        }
    }

    if (isset($_POST['delete_student'])) {

        $student_id = mysqli_real_escape_string($con, $_POST['student_id']);

        $query = "DELETE FROM students WHERE id='$student_id'";
        $query_run = mysqli_query($con, $query);

        if ($query_run) {
            RespondWithJson(200, 'Student Deleted Successfully');

            return;
        } else {
            RespondWithJson(500, 'Failed to Delete Student');

            return false;
        }

    }

