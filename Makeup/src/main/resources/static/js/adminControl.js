// document.addEventListener("DOMContentLoaded", () => {
//     const sidebar = document.querySelector(".Sidebar");
//     const main = document.querySelector(".admin-main");
//     const submenuTitles = document.querySelectorAll(".Submenu-title");
//     const popupMenuOrder = document.getElementById("popup-menu-order");
//     const popupMenuAppointment = document.getElementById("popup-menu-appointment");
//     const menuButtonOrder = document.querySelector(".btnMore-order");
//     const menuButtonAppointment = document.querySelector(".btnMore-appointment");

//     let isPopupOrderOpen = false;
//     let isPopupAppointmentOpen = false;

//     if (!sidebar) {
//         console.warn("Sidebar element not found");
//     }

//     // Hàm toggle sidebar
//     function toggleSidebar() {
//         sidebar?.classList.toggle("showSidebar");
//         main?.classList.toggle("showSidebar");
//     }

//     // Hàm toggle popup menu (popup order)
//     function togglePopupOrder() {
//         if (!popupMenuOrder) return;

//         if (!isPopupOrderOpen) {
//             popupMenuOrder.classList.remove("d-none");
//             popupMenuOrder.classList.add("d-block");
//             isPopupOrderOpen = true;
//             document.addEventListener("click", handleClickOutsideOrder);
//         } else {
//             closePopupOrder();
//         }
//     }

//     // Hàm toggle popup menu (popup appointment)
//     function togglePopupAppointment() {
//         if (!popupMenuAppointment) return;

//         if (!isPopupAppointmentOpen) {
//             popupMenuAppointment.classList.remove("d-none");
//             popupMenuAppointment.classList.add("d-block");
//             isPopupAppointmentOpen = true;
//             document.addEventListener("click", handleClickOutsideAppointment);
//         } else {
//             closePopupAppointment();
//         }
//     }

//     // Hàm đóng popup order
//     function closePopupOrder() {
//         if (!popupMenuOrder) return;

//         popupMenuOrder.classList.remove("d-block");
//         popupMenuOrder.classList.add("d-none");
//         isPopupOrderOpen = false;

//         document.removeEventListener("click", handleClickOutsideOrder);
//     }

//     // Hàm đóng popup appointment
//     function closePopupAppointment() {
//         if (!popupMenuAppointment) return;

//         popupMenuAppointment.classList.remove("d-block");
//         popupMenuAppointment.classList.add("d-none");
//         isPopupAppointmentOpen = false;

//         document.removeEventListener("click", handleClickOutsideAppointment);
//     }

//     // Xử lý click ngoài popup order
//     function handleClickOutsideOrder(event) {
//         if (
//             popupMenuOrder &&
//             !popupMenuOrder.contains(event.target) &&
//             !menuButtonOrder?.contains(event.target)
//         ) {
//             closePopupOrder();
//         }
//     }

//     // Xử lý click ngoài popup appointment
//     function handleClickOutsideAppointment(event) {
//         if (
//             popupMenuAppointment &&
//             !popupMenuAppointment.contains(event.target) &&
//             !menuButtonAppointment?.contains(event.target)
//         ) {
//             closePopupAppointment();
//         }
//     }

//     // Gán sự kiện click cho các nút
//     menuButtonOrder?.addEventListener("click", togglePopupOrder);
//     menuButtonAppointment?.addEventListener("click", togglePopupAppointment);

//     // Xử lý click submenu
//     submenuTitles.forEach((title) => {
//         title.addEventListener("click", () => {
//             submenuTitles.forEach((t) => t.classList.remove("active"));
//             title.classList.add("active");
//         });
//     });

//     // Xử lý các mục trong popup menu
//     const popupMenuItems = document.querySelectorAll(".popupMenuItem");
//     popupMenuItems.forEach(item => {
//         item.addEventListener("click", async (event) => {
//             const apiEndpoint = item.getAttribute("data-api");
//             const isCustomRange = item.getAttribute("data-custom-range");

//             if (isCustomRange) {
//                 handleCustomRange();
//             } else if (apiEndpoint) {
//                 try {
//                     const response = await fetch(apiEndpoint);
//                     if (!response.ok) throw new Error("API call failed");
//                     const data = await response.json();

//                     // Gọi hàm vẽ biểu đồ với dữ liệu từ API
//                     displayChart(data);
//                 } catch (error) {
//                     console.error("Error fetching API:", error);
//                     alert("Failed to fetch data");
//                 }
//             }
//             closePopup()
//         });
//     });

//     // Hàm xử lý Custom Range
//     function handleCustomRange() {
//         const customRangePopup = document.getElementById("customRangePopup");
//         customRangePopup.classList.remove("d-none"); // Hiển thị popup

//         // Lắng nghe sự kiện đóng và gửi dữ liệu khi chọn phạm vi ngày
//         const submitRangeButton = customRangePopup.querySelector("#submitRange");
//         const closePopupButton = customRangePopup.querySelector("#closePopup");

//         submitRangeButton.addEventListener("click", () => {
//             const startDate = document.getElementById("startDate").value;
//             const endDate = document.getElementById("endDate").value;

//             if (!startDate || !endDate) {
//                 alert("Please select both start and end dates.");
//                 return;
//             }

//             if (startDate > endDate) {
//                 alert("Please select start date before end date.");
//                 return;
//             }

//             // Gửi yêu cầu API với startDate và endDate
//             fetch(`/appointments/stats/customRange?startDate=${startDate}&endDate=${endDate}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     displayChart(data, "appointment"); // Gọi với loại chart appointment
//                     customRangePopup.classList.add("d-none"); // Đóng popup sau khi nhận dữ liệu
//                 })
//                 .catch(error => {
//                     console.error("Error fetching data:", error);
//                     alert("Failed to fetch data");
//                     customRangePopup.classList.add("d-none"); // Đóng popup nếu có lỗi
//                 });
//         });

//         closePopupButton.addEventListener("click", () => {
//             customRangePopup.classList.add("d-none"); // Đóng popup khi nhấn "Close"
//         });
//     }

//     // Hàm hiển thị biểu đồ với dữ liệu API
//     function displayChart(response, chartType) {
//         // Lấy phần tử container của biểu đồ
//         const chartContainer = document.getElementById("chartContainer");

//         // Xóa phần tử biểu đồ cũ nếu tồn tại
//         if (chartContainer) {
//             chartContainer.innerHTML = ''; // Xóa nội dung của phần tử container
//         }

//         // Khởi tạo mảng dataPoints để chứa dữ liệu cho biểu đồ
//         let dataPoints = [];

//         // Kiểm tra dữ liệu và tạo các dataPoints cho biểu đồ
//         if (response && typeof response === "object") {
//             Object.keys(response).forEach(key => {
//                 let count = response[key] || 0; // Nếu không có dữ liệu thì set là 0

//                 // Đảm bảo số lượng là số nguyên
//                 count = Math.round(count);

//                 // Dữ liệu theo ngày hoặc theo tháng
//                 if (key.includes("-")) {
//                     dataPoints.push({
//                         label: key, // Ngày hoặc tuần
//                         y: count // Số lượng
//                     });
//                 } else {
//                     dataPoints.push({
//                         label: "Ngày " + key,
//                         y: count
//                     });
//                 }
//             });

//             // Tạo biểu đồ mới trong phần tử chartContainer
//             const chart = new CanvasJS.Chart("chartContainer", {
//                 animationEnabled: true,
//                 theme: "light2",
//                 axisY: {
//                     title: "Số lượng",
//                     includeZero: true,
//                     minimum: 0,
//                     interval: 1,
//                     stripLines: [{
//                         value: 0,
//                         color: "#888",
//                         lineDashType: "solid",
//                         width: 1
//                     }],
//                     labelFormatter: function (e) {
//                         return Math.round(e.value);
//                     }
//                 },
//                 data: [{
//                     type: "column", // Loại biểu đồ: cột (column)
//                     dataPoints: dataPoints
//                 }]
//             });
//             chart.render();
//         } else {
//             console.error("Dữ liệu không hợp lệ", response);
//         }
//     }
// });



document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".Sidebar");
    const main = document.querySelector(".admin-main");
    const submenuTitles = document.querySelectorAll(".Submenu-title");
    const popupMenus = {
        main: document.getElementById("popup-menu"),
        order: document.getElementById("popup-menu-order"),
    };
    const menuButtons = {
        main: document.querySelector(".btnMore"),
        order: document.querySelector(".btnMoreOrder"),
    };
    const customRangePopup = document.getElementById("customRangePopup");
    const toggleButton = document.querySelector(".btnToggleSidebar");

    // Hàm toggle sidebar
    function toggleSidebar() {
        sidebar?.classList.toggle("showSidebar");
        main?.classList.toggle("showSidebar");
    }

    // Hàm toggle sidebar
    function toggleSidebar() {
        sidebar?.classList.toggle("showSidebar");
        main?.classList.toggle("showSidebar");
    }

    // Biến trạng thái lưu kích thước màn hình hiện tại
    let isSmallScreen = window.matchMedia("(max-width: 992px)").matches;

    // Hàm xử lý thay đổi kích thước
    function handleResize() {
        const mediaQuery = window.matchMedia("(max-width: 992px)");
        const currentlySmallScreen = mediaQuery.matches;

        // Chỉ thực hiện khi trạng thái thay đổi
        if (currentlySmallScreen !== isSmallScreen) {
            isSmallScreen = currentlySmallScreen; // Cập nhật trạng thái

            // Xóa hoặc thêm class dựa trên kích thước màn hình
            if (isSmallScreen) {
                sidebar?.classList.remove("showSidebar");
                main?.classList.remove("showSidebar");
            } else {
                sidebar?.classList.add("showSidebar");
                main?.classList.add("showSidebar");
            }
        }
    }

    // Lắng nghe sự kiện resize
    window.addEventListener("resize", handleResize);

    // Kiểm tra kích thước ngay khi tải trang
    handleResize();

    // Gắn sự kiện click vào nút toggle
    toggleButton.addEventListener("click", toggleSidebar);

    let activePopup = null;

    if (!sidebar) console.warn("Sidebar element not found");

    // Hàm mở/đóng popup
    function togglePopup(popupKey) {
        const popup = popupMenus[popupKey];
        if (!popup) return;

        if (activePopup === popupKey) {
            closePopup();
        } else {
            closePopup(); // Đóng popup đang mở trước đó
            popup.classList.remove("d-none");
            popup.classList.add("d-block");
            activePopup = popupKey;
            document.addEventListener("click", handleClickOutside);
        }
    }

    // Hàm đóng popup
    function closePopup() {
        if (activePopup && popupMenus[activePopup]) {
            const popup = popupMenus[activePopup];
            popup.classList.remove("d-block");
            popup.classList.add("d-none");
        }
        activePopup = null;
        document.removeEventListener("click", handleClickOutside);
    }

    // Hàm xử lý click ngoài popup
    function handleClickOutside(event) {
        if (
            activePopup &&
            popupMenus[activePopup] &&
            !popupMenus[activePopup].contains(event.target) &&
            !menuButtons[activePopup]?.contains(event.target)
        ) {
            closePopup();
        }
    }

    // Xử lý click submenu
    submenuTitles.forEach((title) => {
        title.addEventListener("click", () => {
            submenuTitles.forEach((t) => t.classList.remove("active"));
            title.classList.add("active");
        });
    });

    // Gắn sự kiện toggle popup vào các nút menu
    if (menuButtons.main) {
        menuButtons.main.addEventListener("click", (event) => {
            event.stopPropagation();
            togglePopup("main");
        });
    }

    if (menuButtons.order) {
        menuButtons.order.addEventListener("click", (event) => {
            event.stopPropagation();
            togglePopup("order");
        });
    }

    // Xử lý các mục trong popup menu
    document.querySelectorAll(".popup-menu-item").forEach((item) => {
        item.addEventListener("click", async (event) => {
            const apiEndpoint = item.getAttribute("data-api");
            const isCustomRange = item.getAttribute("data-custom-range");

            if (isCustomRange) {
                handleCustomRange("appointments");
            } else if (apiEndpoint) {
                try {
                    const response = await fetch(apiEndpoint);
                    if (!response.ok) throw new Error("API call failed");
                    const data = await response.json();
                    displayChart(data, "chartContainer");
                } catch (error) {
                    console.error("Error fetching API:", error);
                    alert("Failed to fetch data");
                }
            }
            closePopup();
        });
    });

    // Xử lý các mục trong popup menu order
    document.querySelectorAll(".popup-menu-item-order").forEach((item) => {
        item.addEventListener("click", async (event) => {
            const apiEndpoint = item.getAttribute("data-api");
            const isCustomRange = item.getAttribute("data-custom-range");

            if (isCustomRange) {
                handleCustomRange("orders");
            } else if (apiEndpoint) {
                try {
                    const response = await fetch(apiEndpoint);
                    if (!response.ok) throw new Error("API call failed");
                    const data = await response.json();
                    displayChart(data, "chartContainerOrder");
                } catch (error) {
                    console.error("Error fetching API:", error);
                    alert("Failed to fetch data");
                }
            }
            closePopup();
        });
    });

    // Hàm xử lý Custom Range
    function handleCustomRange(type) {
        customRangePopup.classList.remove("d-none");

        const submitRangeButton = customRangePopup.querySelector("#submitRange");
        const closePopupButton = customRangePopup.querySelector("#closePopup");

        const submitHandler = () => {
            const startDate = document.getElementById("startDate").value;
            const endDate = document.getElementById("endDate").value;

            if (!startDate || !endDate) {
                alert("Please select both start and end dates.");
                return;
            }

            if (startDate > endDate) {
                alert("Start date must be before end date.");
                return;
            }

            fetch(`/${type}/stats/customRange?startDate=${startDate}&endDate=${endDate}`)
                .then((response) => response.json())
                .then((data) => {
                    type == "orders" ? displayChart(data, "chartContainerOrder") : displayChart(data, "chartContainer");
                    customRangePopup.classList.add("d-none");
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    alert("Failed to fetch data");
                    customRangePopup.classList.add("d-none");
                });
        };

        const closeHandler = () => customRangePopup.classList.add("d-none");

        submitRangeButton.addEventListener("click", submitHandler, { once: true });
        closePopupButton.addEventListener("click", closeHandler, { once: true });
    }

    // Hàm hiển thị biểu đồ với dữ liệu API
    function displayChart(response, containerId) {
        const chartContainer = document.getElementById(containerId);
        if (!chartContainer) return;

        chartContainer.innerHTML = ""; // Xóa nội dung cũ
        if (!response || typeof response !== "object") {
            console.error("Invalid data", response);
            return;
        }

        const dataPoints = Object.entries(response).map(([key, count]) => ({
            label: key.includes("-") ? key : `Ngày ${key}`,
            y: Math.round(count || 0),
        }));

        const chart = new CanvasJS.Chart(containerId, {
            animationEnabled: true,
            theme: "light2",
            axisY: {
                title: "Số lượng",
                includeZero: true,
                interval: 1,
            },
            data: [{ type: "column", dataPoints }],
        });
        chart.render();
    }

    // Hàm chuyển đổi các tab
    function toggleTabContent(tabId) {
        const dashboard = document.getElementById('dashboard');
        const schedule = document.getElementById('schedule');
        const staff = document.getElementById('staff');
        const account = document.getElementById('account');
        const appointment = document.getElementById('appointment');
        const product = document.getElementById('product');
        const createProduct = document.getElementById('create-product');
        const editProduct = document.getElementById('edit-product');

        // Ẩn tất cả nội dung và sau đó hiển thị tab tương ứng
        dashboard.classList.add('d-none');
        schedule.classList.add('d-none');
        staff.classList.add('d-none');
        account.classList.add('d-none');
        appointment.classList.add('d-none');
        product.classList.add('d-none');
        createProduct.classList.add('d-none');
        editProduct.classList.add('d-none');

        if (tabId === 'dashboard') {
            dashboard.classList.remove('d-none');
        } else if (tabId === 'schedule') {
            schedule.classList.remove('d-none');
        } else if (tabId === 'staff') {
            staff.classList.remove('d-none');
        } else if (tabId === 'product') {
            product.classList.remove('d-none');
        } else if (tabId === 'account') {
            account.classList.remove('d-none');
        } else if (tabId === 'appointment') {
            appointment.classList.remove('d-none');
        }
    }

    // Sử dụng hàm dùng chung cho các tab
    document.getElementById('tab-schedule').addEventListener('click', function () {
        // Chuyển tab và tải nội dung
        toggleTabContent('schedule');
        loadAppointment(11, 2024);
    });

    document.getElementById('tab-dashboard').addEventListener('click', function () {
        toggleTabContent('dashboard');
    });

    document.getElementById('tab-staff').addEventListener('click', function () {
        toggleTabContent('staff');
        fetch('/test')
            .then(response => response.text())
            .then(data => {
                document.getElementById('staff').innerHTML = data;
                loadStaffs();
            })
            .catch(error => console.error('Error loading HTML:', error));
    });

    document.getElementById('tab-account').addEventListener('click', function () {
        toggleTabContent('account');
        fetch('/test4')
            .then(response => response.text())
            .then(data => {
                document.getElementById('account').innerHTML = data;
                loadCustomers();
            })
            .catch(error => console.error('Error loading HTML:', error));
    });

    document.getElementById('tab-appointment').addEventListener('click', function () {
        toggleTabContent('appointment');
        fetch('/test5')
            .then(response => response.text())
            .then(data => {
                document.getElementById('appointment').innerHTML = data;
                loadAppointmentsDetail();
            })
            .catch(error => console.error('Error loading HTML:', error));
    });

    document.getElementById('tab-product').addEventListener('click', function () {
        toggleTabContent('product');
        fetch('/admin/products')
            .then(response => response.text())
            .then(data => {
                document.getElementById('product').innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML:', error));
    });

    ///////////////////////Staff tab///////////////////////////
    let staffList = [];

    function showAlert(type, message) {
        const alertBox = document.createElement('div');
        alertBox.className = `alert alert-${type}`;
        alertBox.innerText = message;

        alertBox.style.position = 'fixed';
        alertBox.style.top = '10%';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translateX(-50%)';
        alertBox.style.zIndex = '9999';

        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.style.opacity = '0';
            alertBox.style.transform = 'translateX(-50%) translateY(-50%)';
            setTimeout(() => {
                alertBox.remove();
            }, 600);
        }, 3000);
    }

    // Hàm tải danh sách nhân viên
    function loadStaffs() {
        fetch('/api/staff')
            .then(response => response.json())
            .then(data => {
                // Gọi renderStaffTable để hiển thị dữ liệu vào bảng
                staffList = data;
                renderStaffTable(data);
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu:', error);
            });
    }

    // Hàm xóa khách hàng
    function deleteStaff(id) {
        const customerId = id;
        const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));

        document.getElementById('confirmDeleteButton').onclick = function () {
            fetch(`/api/staff/${customerId}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        showAlert('success', 'Xóa nhân viên thành công!');
                        loadStaffs();
                        clearFormSearchStaff();
                    } else {
                        showAlert('danger', 'Xóa nhân viên thất bại!');
                    }
                    confirmDeleteModal.hide();
                })
                .catch(error => {
                    console.error('Error:', error);
                    showAlert('danger', 'Có lỗi xảy ra!');
                    confirmDeleteModal.hide();
                });
        };
        confirmDeleteModal.show();
    }


    // Hàm mở modal thêm nhân viên
    function showAddModal() {
        // Reset form và ẩn ID nhân viên
        document.getElementById('addForm').reset();
        document.getElementById("addModalLabel").innerHTML = "Thêm nhân viên";
        document.getElementById('staffId').classList.add("d-none");
        // Đặt thuộc tính "data-action" của nút lưu là "add"
        document.getElementById('saveButton').setAttribute('data-action', 'add');
        const addModal = new bootstrap.Modal(document.getElementById('addModal'));
        addModal.show();
    }

    function showAddModalAppointment() {
        // Reset form và ẩn ID nhân viên
        document.getElementById('addForm').reset();
        document.getElementById("addModalLabel").innerHTML = "Thêm nhân viên";
        document.getElementById('staffId').classList.add("d-none");
        // Đặt thuộc tính "data-action" của nút lưu là "add"
        document.getElementById('saveButton').setAttribute('data-action', 'add');
        const addModalAppointment = new bootstrap.Modal(document.getElementById('addModalAppointment'));
        addModalAppointment.show();
    }

    // Hàm chỉnh sửa thông tin nhân viên
    function editStaff(id) {
        // Lấy ID của nhân viên từ thuộc tính data-id
        const staffId = id;
        document.getElementById("addModalLabel").innerHTML = "Chỉnh sửa nhân viên";
        document.getElementById('staffId').classList.remove("d-none");

        // Gửi yêu cầu GET để lấy thông tin nhân viên từ API
        fetch(`/api/staff/${staffId}`)
            .then(response => response.json())
            .then(staff => {
                // Điền dữ liệu vào form
                document.getElementById('addStaffId').value = staff.id;
                document.getElementById('addStaffName').value = staff.nameStaff;
                document.getElementById('addPhoneNumber').value = staff.phone;

                // Đặt thuộc tính "data-action" của nút lưu là "edit"
                document.getElementById('saveButton').setAttribute('data-action', 'edit');
                const editModal = new bootstrap.Modal(document.getElementById('addModal'));
                editModal.show();
            })
            .catch(error => {
                console.error('Error:', error);
                // Hiển thị thông báo lỗi nếu có
                showAlert('danger', 'Có lỗi xảy ra khi lấy thông tin nhân viên!');
            });
    }

    // Hàm thêm khách hàng
    function addStaff() {
        const customerName = document.getElementById('addStaffName').value;
        const sex = document.getElementById('addSex').value;
        const phoneNumber = document.getElementById('addPhoneNumber').value;
        const birthday = document.getElementById('addBirthday').value;
        const address = document.getElementById('addAddress').value;
        const status = document.getElementById('addStatus').value;

        if (!customerName || !phoneNumber || !birthday || !phoneNumber || !address) {
            showAlert('danger', 'Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const customerData = {
            customerName,
            sex,
            phoneNumber,
            birthday,
            address,
            status
        };

        fetch('/admin/customers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        })
            .then(response => {
                if (response.ok) {
                    showAlert('success', 'Thêm khách hàng thành công!');
                    loadStaffs();
                    const addModal = bootstrap.Modal.getInstance(document.getElementById('addModal'));
                    addModal.hide();
                } else {
                    showAlert('danger', 'Thêm khách hàng thất bại!');
                }
            })
            .catch(error => {
                console.error('Lỗi khi thêm khách hàng:', error);
            });
    }

    // Hàm lưu thay đổi thông tin nhân viên
    function saveChangesStaff() {
        const id = document.getElementById('addStaffId').value;
        const nameStaff = document.getElementById('addStaffName').value;
        const phone = document.getElementById('addPhoneNumber').value;

        // Kiểm tra các trường dữ liệu bắt buộc
        if (!nameStaff || !phone) {
            showAlert('danger', 'Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Kiểm tra xem là hành động thêm mới hay chỉnh sửa
        const url = id ? `/api/staff/${id}` : '/api/staff'; // URL cho hành động sửa hoặc thêm
        const method = id ? 'PUT' : 'POST'; // Nếu có customerId thì là sửa, nếu không thì là thêm mới

        // Chuẩn bị dữ liệu gửi lên
        const requestData = {
            nameStaff,
            phone,
        };

        // Nếu là chỉnh sửa thì thêm `customerId` vào
        if (id) {
            requestData.id = id;
        }

        // Gửi yêu cầu API
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                if (response.status == 200) {
                    const action = id ? 'Sửa' : 'Thêm mới';
                    showAlert('success', `${action} nhân viên thành công!`);
                    loadStaffs(); // Tải lại danh sách nhân viên
                    const editModal = bootstrap.Modal.getInstance(document.getElementById('addModal'));
                    editModal.hide();
                    clearFormSearchStaff(); // Xóa form tìm kiếm nếu có
                } else {
                    showAlert('danger', 'Có lỗi khi lưu thay đổi!');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('danger', 'Có lỗi xảy ra khi lưu thay đổi!');
            });
    }

    function searchStaff() {
        const searchInput = document.getElementById("searchStaff").value.toLowerCase();


        if (staffList.length == 0) {
            fetch('/api/staff')
                .then(response => response.json())
                .then(data => {
                    staffList = data;
                })
                .catch(error => {
                    console.error('Lỗi khi tải dữ liệu:', error);
                });
        }

        // Lọc danh sách nhân viên dựa trên các thuộc tính
        const filteredList = staffList.filter((staff) =>
            staff.nameStaff.toLowerCase().includes(searchInput) ||
            staff.phone.includes(searchInput) ||
            staff.id.toString().includes(searchInput)
        );

        // Hiển thị kết quả lọc lên bảng
        renderStaffTable(filteredList);
    }

    // Hàm hiển thị danh sách nhân viên lên bảng
    function renderStaffTable(data) {
        const tableContent = document.getElementById('table-content');
        tableContent.innerHTML = ''; // Xóa nội dung cũ

        // Duyệt qua danh sách nhân viên và thêm hàng vào bảng
        data.forEach(staff => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${staff.id}</td>
            <td>${staff.nameStaff}</td>
            <td>${staff.phone}</td>
            <td>
                <button type="button" class="btn btn-warning btn-sm" onclick="editStaff(${staff.id})">Chỉnh sửa</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteStaff(${staff.id})">Xóa</button>
            </td>
        `;
            tableContent.appendChild(row);
        });
    }

    // Lắng nghe sự kiện nhập liệu vào ô tìm kiếm
    document.getElementById('searchStaff').addEventListener('input', searchStaff);

    // Hàm làm mới tìm kiếm
    function clearFormSearchStaff() {
        document.getElementById('searchStaff').value = '';
        //    document.getElementById('statusFilter').selectedIndex = 0;
    }

    /////////////////////////////////////////////////////////////////////////////////////

});
