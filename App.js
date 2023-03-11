$(document).on("submit", "#saveStudent", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    formData.append("save_student", true);

    console.log(formData);

    $.ajax({
        type: "POST",
        url: "code.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            const res = JSON.parse(response);
            if (res.status === 422) {
                $('#add_student_error_message').removeClass('d-none').text(res.message);
            } else if (res.status === 200) {
                $('error_message').addClass('d-none');
                $('#addStudentModal').modal('hide');

                $('#saveStudent')[0].reset();

                $('#mytable').load(location.href + ' #mytable');
            }
        }
    });

});

$(document).on("click", ".editStudentBtn", function () {
    let student_id = $(this).val();

    // Fetch Data From code.php
    $.ajax({
        type: "GET",
        url: "code.php?student_id=" + student_id,
        success: function (response) {
            const res = JSON.parse(response);

            if (res.status === 404) {
                // Show Error Message
                $('#update_student_error_message').removeClass('d-none').text(res.message);
            } else if (res.status === 200) {
                // Set Data in inputs
                $('#student_id').val(res.data.id);
                $('#name').val(res.data.name);
                $('#email').val(res.data.email);
                $('#phone').val(res.data.phone);
                $('#course').val(res.data.course);

                $('#editStudentModal').modal('show');
            }
        }
    });
});

$(document).on("submit", "#updateStudent", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    formData.append("update_student", true);

    console.log(formData);

    $.ajax({
        type: "POST",
        url: "code.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            const res = JSON.parse(response);
            if (res.status === 422) {
                $('#update_student_error_message').removeClass('d-none').text(res.message);
            } else if (res.status === 200) {
                $('#update_student_error_message').addClass('d-none');
                $('#editStudentModal').modal('hide');

                $('#updateStudent')[0].reset();

                console.log(location.href + ' #mytable');

                $('#mytable').load(location.href + ' #mytable');
            }
        }
    });

});

$(document).on("click", ".deleteStudentBtn", function () {
    const student_id = $(this).val();

    $('#delete_student_id').val(student_id);
    $('#deleteStudent input').prop("disabled", true);

    // Fetch Data From code.php
    $.ajax({
        // WHY HERE IN THE ORIGINAL CODE IS POST and not GET
        type: "GET",
        url: "code.php?student_id=" + student_id,
        success: function (response) {
            const res = JSON.parse(response);

            if (res.status === 404) {
                // Show Error Message
                $('#delete_student_error_message').removeClass('d-none').text(res.message);
            } else if (res.status === 200) {
                // Set Data in inputs
                $('#delete_student_id').val(res.data.id);
                $('#name-delete').val(res.data.name);
                $('#email-delete').val(res.data.email);
                $('#course-delete').val(res.data.course);
                $('#phone-delete').val(res.data.phone);

                $('#deleteStudentModal').modal('show');
            }
        }
    });
});

$(document).on("submit", "#deleteStudent", function (event) {
    event.preventDefault();

    const student_id = $('#delete_student_id').val();


    // Here we didn't send the form Data because we only need student_id to remove student in DB
    $.ajax({
        type: "POST",
        url: "code.php",
        data: {
            "delete_student": true,
            "student_id": student_id
        },
        success: function (response) {
            const res = JSON.parse(response);

            console.log(res);

            if (res.status === 422) {
                console.log("error");
                $('#delete_student_error_message').removeClass('d-none').text(res.message);
            } else if (res.status === 200) {
                $('#delete_student_error_message').addClass('d-none');
                $('#deleteStudentModal').modal('hide');

                console.log(location.href + ' #mytable');

                $('#mytable').load(location.href + ' #mytable');
            }
        }
    });

});