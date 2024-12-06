package com.example.Makeup.controller.api.web;

import com.example.Makeup.dto.StaffDTO;
import com.example.Makeup.entity.Staff;
import com.example.Makeup.mapper.StaffMapper;
import com.example.Makeup.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffRestController {

    @Autowired
    private StaffService staffService;

    @Autowired
    private StaffMapper staffMapper;

    @GetMapping
    public List<StaffDTO> getAllStaff() {
        return staffService.getAllStaff();
    }

    // Lấy thông tin nhân viên theo ID, trả về StaffDTO
    @GetMapping("/{id}")

    public ResponseEntity<StaffDTO> getStaffById(@PathVariable int id) {
        return staffService.getStaffById(id)
                .map(staff -> ResponseEntity.ok(staffMapper.toStaffDTO(staff))) // Sử dụng StaffMapper
                .orElse(ResponseEntity.notFound().build());
    }

    // Thêm nhân viên, trả về StaffDTO
    @PostMapping
    public StaffDTO addStaff(@RequestBody StaffDTO staffDTO) {
        Staff staff = staffMapper.toStaffEntity(staffDTO); // Chuyển StaffDTO thành Staff
        Staff savedStaff = staffService.addStaff(staff);
        return staffMapper.toStaffDTO(savedStaff); // Chuyển Staff thành StaffDTO và trả về
    }

    // Cập nhật nhân viên, trả về StaffDTO
    @PutMapping("/{id}")
    public ResponseEntity<StaffDTO> updateStaff(@PathVariable int id, @RequestBody StaffDTO staffDTO) {
        Staff staff = staffMapper.toStaffEntity(staffDTO); // Chuyển StaffDTO thành Staff
        try {
            Staff updatedStaff = staffService.updateStaff(id, staff);
            return ResponseEntity.ok(staffMapper.toStaffDTO(updatedStaff)); // Chuyển Staff thành StaffDTO và trả về
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable int id) {
        // Cập nhật các lịch hẹn có liên quan
        staffService.updateAppointmentsStaffId(id);

        // Xóa nhân viên
        staffService.deleteStaff(id);

        // Trả về mã trạng thái 204 (No Content)
        return ResponseEntity.noContent().build();

        //Chưa làm xóa account
    }

}
