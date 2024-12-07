package com.example.Makeup.mapper;

import com.example.Makeup.dto.StaffDTO;
import com.example.Makeup.entity.Account;
import com.example.Makeup.entity.Staff;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-07T10:42:26+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class StaffMapperImpl implements StaffMapper {

    @Override
    public StaffDTO toStaffDTO(Staff staff) {
        if ( staff == null ) {
            return null;
        }

        StaffDTO staffDTO = new StaffDTO();

        Integer id = staffAccountId( staff );
        if ( id != null ) {
            staffDTO.setAccountId( String.valueOf( id ) );
        }
        staffDTO.setId( staff.getId() );
        staffDTO.setNameStaff( staff.getNameStaff() );
        staffDTO.setPhone( staff.getPhone() );

        return staffDTO;
    }

    @Override
    public Staff toStaffEntity(StaffDTO staffDTO) {
        if ( staffDTO == null ) {
            return null;
        }

        Staff staff = new Staff();

        staff.setAccount( staffDTOToAccount( staffDTO ) );
        staff.setId( staffDTO.getId() );
        staff.setNameStaff( staffDTO.getNameStaff() );
        staff.setPhone( staffDTO.getPhone() );

        return staff;
    }

    @Override
    public List<StaffDTO> toStaffDTOList(List<Staff> staffList) {
        if ( staffList == null ) {
            return null;
        }

        List<StaffDTO> list = new ArrayList<StaffDTO>( staffList.size() );
        for ( Staff staff : staffList ) {
            list.add( toStaffDTO( staff ) );
        }

        return list;
    }

    private Integer staffAccountId(Staff staff) {
        if ( staff == null ) {
            return null;
        }
        Account account = staff.getAccount();
        if ( account == null ) {
            return null;
        }
        int id = account.getId();
        return id;
    }

    protected Account staffDTOToAccount(StaffDTO staffDTO) {
        if ( staffDTO == null ) {
            return null;
        }

        Account account = new Account();

        if ( staffDTO.getAccountId() != null ) {
            account.setId( Integer.parseInt( staffDTO.getAccountId() ) );
        }

        return account;
    }
}
